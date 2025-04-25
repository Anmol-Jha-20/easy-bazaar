// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     productDetails: {
//       type: Array,
//       default: [],
//     },
//     email: {
//       type: String,
//       default: "",
//     },
//     userId: {
//       type: String,
//       default: "",
//     },
//     paymentDetails: {
//       razorpay_payment_id: {
//         type: String,
//         default: "",
//       },
//       razorpay_order_id: {
//         type: String,
//         default: "",
//       },
//       razorpay_signature: {
//         type: String,
//         default: "",
//       },
//       payment_method: {
//         type: String,
//         default: "", // e.g., card, upi, netbanking, etc.
//       },
//       payment_status: {
//         type: String,
//         default: "Paid", // Razorpay doesn't return status on server, so default "Paid"
//       },
//     },
//     shippingAddress: {
//       type: String,
//       default: "",
//     },
//     shippingCity: {
//       type: String,
//       default: "",
//     },
//     shippingPincode: {
//       type: String,
//       default: "",
//     },
//     totalAmount: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const orderModel = mongoose.model("order", orderSchema);

// module.exports = orderModel;

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
