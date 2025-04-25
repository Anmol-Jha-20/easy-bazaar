const express = require("express");
// const crypto = require("crypto");
// const Order = require("../models/orderProductModel.js");
// const Razorpay = require("razorpay");
// const mongoose = require("mongoose");

const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp.js");
const userSignInController = require("../controller/user/userSignin.js");
const authToken = require("../middleware/authToken.js");
const userDetailsController = require("../controller/user/userDetails.js");
const userLogout = require("../controller/user/userLogout.js");
const allUsers = require("../controller/user/allUsers.js");
const updateUser = require("../controller/user/updateUser.js");
const UploadProductController = require("../controller/product/uploadProduct.js");
const getProductController = require("../controller/product/getProduct.js");
const updateProductController = require("../controller/product/updateProduct.js");
const getCategoryProduct = require("../controller/product/getCategoryProduct.js");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct.js");
const getProductDetails = require("../controller/product/getProductDetails.js");
const addToCartController = require("../controller/user/addToCartController.js");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct.js");
const addToCartViewProduct = require("../controller/user/addToCardViewProduct.js");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct.js");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct.js");
const searchProduct = require("../controller/product/searchProduct.js");
const filterProductController = require("../controller/product/filterProduct.js");
const updateUserProfile = require("../controller/user/updateUserProfile.js");
const paymentController = require("../controller/order/paymentController.js");
const orderController = require("../controller/order/orderController.js");
const razorpayWebhook = require("../controller/order/webhook.js");
const createOrder = require("../controller/order/createOrder.js");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);
router.post("/update-profile", authToken, updateUserProfile);

//admin panel
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

//product
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

//user add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-cart-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

//Payment and order
router.post("/checkout", authToken, paymentController);
router.post("/create-order", createOrder);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  razorpayWebhook
); // /api/webhook
router.get("/order-list", authToken, orderController);

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// router.post("/verify", async (req, res) => {
//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     userId,
//     items,
//     totalAmount,
//   } = req.body;

//   if (
//     !razorpay_order_id ||
//     !razorpay_payment_id ||
//     !razorpay_signature ||
//     !userId
//   ) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Missing required fields" });
//   }

//   try {
//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature === razorpay_signature) {
//       try {
//         // Save order in MongoDB
//         const newOrder = new Order({
//           userId: mongoose.Types.ObjectId(userId),
//           items,
//           totalAmount,
//           razorpay_order_id,
//           razorpay_payment_id,
//           paymentStatus: "Paid",
//         });
//         console.log("Saving Order With: ", {
//           userId,
//           items,
//           totalAmount,
//           razorpay_order_id,
//           razorpay_payment_id,
//         });

//         await newOrder.save();

//         return res.status(200).json({
//           success: true,
//           message: "Payment verified & order saved",
//           data: newOrder,
//         });
//       } catch (err) {
//         console.error("Error saving order:", err);
//         return res.status(500).json({
//           success: false,
//           message: "Payment verified but saving order failed",
//           error: err.message,
//         });
//       }
//     } else {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid signature" });
//     }
//   } catch (error) {
//     console.error("Verification Error:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Server error verifying payment" });
//   }
// });

module.exports = router;
