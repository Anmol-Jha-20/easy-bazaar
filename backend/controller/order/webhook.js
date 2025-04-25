const crypto = require("crypto");
const orderModel = require("../../models/orderProductModel.js");
const addToCartModel = require("../../models/cartProduct.js");

const razorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = req.headers["x-razorpay-signature"];
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest !== signature) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid signature" });
  }

  const event = req.body;
  console.log("✅ Webhook hit");
  console.log("🧾 Signature:", signature);
  console.log("🧮 Digest:", digest);
  console.log("🧠 Event Type:", event.event);

  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;
    console.log("💸 Payment Object:", payment);

    const metadata = payment.notes; // Razorpay के notes में हमने userId और cart info भेजा था
    console.log("📦 Metadata:", metadata);

    const productDetails = JSON.parse(metadata.productDetails); // stringified JSON भेजा था
    console.log("🛍️ Product Details:", productDetails);

    const orderDetails = {
      productDetails: productDetails,
      email: payment.email,
      userId: metadata.userId,
      paymentDetails: {
        paymentId: payment.id,
        payment_method_type: [payment.method],
        payment_status: payment.status,
      },
      shipping_options: [], // Razorpay shipping अलग से नहीं भेजता by default
      totalAmount: payment.amount / 100,
    };

    const order = new orderModel(orderDetails);
    const savedOrder = await order.save();
    console.log("📦 Order Saved:", savedOrder);

    if (savedOrder?._id) {
      await addToCartModel.deleteMany({ userId: metadata.userId });
      console.log("🗑️ Cart cleared for user:", metadata.userId);
    }

    return res.status(200).json({ success: true });
  }

  return res.status(200).json({ success: true });
};

module.exports = razorpayWebhook;
