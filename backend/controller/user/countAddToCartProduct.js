const addToCartModel = require("../../models/cartProduct.js");

const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req.userId;

    const count = await addToCartModel.countDocuments({
      userId: userId,
    });
    const cartItems = await addToCartModel.find({ userId });

    res.json({
      data: {
        count: count,
        cart: cartItems,
      },
      message: "ok",
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = countAddToCartProduct;
