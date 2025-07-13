import User from "../model/userModel.js";
import Order from "../model/orderModel.js";
import razorpay from "../config/razorpay.js";

// PLACE A NEW ORDER (user)
export const placeOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      razorpay_payment_id,
    } = req.body;

    const userId = req.userId;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const newOrder = new Order({
      userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      paymentStatus: razorpay_payment_id ? "paid" : "pending",
      payment_id: razorpay_payment_id || undefined,
      isDelivered: false,
    });

    const savedOrder = await newOrder.save();
    await User.findByIdAndUpdate(userId, { cart: {} });
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


// GET ALL ORDERS FOR A USER
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// GET SINGLE ORDER BY ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "userId",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId._id.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

///////////////////////
// Admin-only actions //
///////////////////////

// GET ALL ORDERS (ADMIN)
export const getAllOrders = async (req, res) => {
  try {
    // Admin auth middleware must verify req.userId and admin status before calling this
    const orders = await Order.find({})
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// UPDATE ORDER STATUS (ADMIN)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    order.isDelivered = status === "Delivered";
    order.updatedAt = Date.now();

    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const createRazorpayOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount, // in paise
      currency: req.body.currency,
      receipt: "order_rcptid_11",
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("❌ Razorpay Order Error:", error);
    res.status(500).json({ message: "Razorpay order creation failed" });
  }
};
