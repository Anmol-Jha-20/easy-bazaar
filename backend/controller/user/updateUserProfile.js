const userModel = require("../../models/userModel.js");
const bcrypt = require("bcryptjs");

async function updateUserProfile(req, res) {
  try {
    const { name, email, password, profilePic } = req.body;

    const updatedFields = { name, email, profilePic };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    const user = await userModel
      .findByIdAndUpdate(req.userId, updatedFields, {
        new: true,
      })
      .select("-password");

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
}

module.exports = updateUserProfile;
