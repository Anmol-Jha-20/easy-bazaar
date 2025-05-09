const uploadProductPermission = require("../../helpers/permission.js");
const productModel = require("../../models/productModel.js");

async function UploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission Denied");
    }

    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message: "Product upload successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadProductController;
