import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        quantity: { type: Number, required: true },
        size: String,
        price: { type: Number, required: true },
        image: String,
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["Packing", "Shipped", "Out for Delivery", "Delivered"],
      default: "Packing",
    },
    payment_id: {
      type: String,
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
