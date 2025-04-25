import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { imageTobase64 } from "../helpers/imageTobase64.js";
import userIcon from "../assets/usericon.png";
import SummaryApi from "../common/index.js";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice.js";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
  });

  useEffect(() => {
    if (user) {
      setData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        profilePic: user.profilePic || "",
      });
    }
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const image = await imageTobase64(file);
    setData((prev) => ({ ...prev, profilePic: image }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.updateUserProfile.url, {
      method: SummaryApi.updateUserProfile.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();

    if (resData.success) {
      toast.success("Profile updated successfully");
      dispatch(setUserDetails(resData.data));
      navigate("/");
    } else {
      toast.error(resData.message || "Something went wrong");
    }
  };

  return (
    <section className="py-10 px-4">
      <div className="max-w-md mx-auto bg-white shadow p-5 rounded-md">
        <h2 className="text-center text-xl font-semibold mb-4">Edit Profile</h2>

        <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full">
          <img src={data.profilePic || userIcon} alt="user" />
          <label>
            <div className="text-xs opacity-80 bg-slate-200 cursor-pointer text-center absolute bottom-0 w-full">
              Upload
            </div>
            <input type="file" className="hidden" onChange={handleUploadPic} />
          </label>
        </div>

        <form onSubmit={handleUpdate} className="pt-6 flex flex-col gap-3">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="w-full bg-slate-100 p-2 rounded mt-1"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="w-full bg-slate-100 p-2 rounded mt-1"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <div>
            <label>New Password (optional)</label>
            <div className="flex items-center bg-slate-100 p-2 rounded mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full bg-transparent outline-none"
                value={data.password}
                onChange={handleOnChange}
              />
              <span
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button className="mt-5 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-all cursor-pointer">
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditProfile;
