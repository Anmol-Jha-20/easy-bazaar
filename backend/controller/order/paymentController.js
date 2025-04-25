const Razorpay = require("razorpay");
const userModel = require("../../models/userModel.js");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const paymentController = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const user = await userModel.findOne({ _id: req.userId });

    const totalAmount = cartItems.reduce((acc, item) => {
      return acc + item.productId.sellingPrice * item.quantity;
    }, 0);

    // Create Razorpay Order
    const options = {
      amount: totalAmount * 100, // Amount in paisa
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      notes: {
        userId: req.userId,
        email: user.email,
        productDetails: JSON.stringify(cartItems),
      },
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      userEmail: user.email,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
};

module.exports = paymentController;
