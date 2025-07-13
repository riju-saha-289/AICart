import User from "../model/userModel.js";

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { size, productId } = req.body;
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Safely clone the cart
    let cartData = JSON.parse(JSON.stringify(userData.cart || {}));

    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] += 1;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = { [size]: 1 };
    }

    await User.findByIdAndUpdate(req.userId, { cart: cartData });

    return res.status(200).json({ message: "Added to cart" });
  } catch (error) {
    return res.status(500).json({ message: `Error adding to cart: ${error.message}` });
  }
};

// UPDATE CART ITEM
export const updateCart = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = JSON.parse(JSON.stringify(userData.cart || {}));

    if (!cartData[productId]) {
      cartData[productId] = {};
    }
    cartData[productId][size] = quantity;

    await User.findByIdAndUpdate(req.userId, { cart: cartData });

    return res.status(200).json({ message: "Cart updated" });
  } catch (error) {
    return res.status(500).json({ message: `Error updating cart: ${error.message}` });
  }
};

// GET USER CART
export const getUserCart = async (req, res) => {
  try {
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartData = userData.cart || {};
    return res.status(200).json(cartData);
  } catch (error) {
    return res.status(500).json({ message: `Error getting cart: ${error.message}` });
  }
};

// REMOVE CART ITEM
export const removeFromCart = async (req, res) => {
  try {
    const { productId, size } = req.body;

    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = JSON.parse(JSON.stringify(userData.cart || {}));

    if (cartData[productId]) {
      if (size && cartData[productId][size]) {
        delete cartData[productId][size];
        if (Object.keys(cartData[productId]).length === 0) {
          delete cartData[productId]; // Remove whole product if no sizes left
        }
      } else {
        delete cartData[productId]; // Remove whole product
      }
    }

    await User.findByIdAndUpdate(req.userId, { cart: cartData });

    return res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    return res.status(500).json({ message: `Error removing item: ${error.message}` });
  }
};
