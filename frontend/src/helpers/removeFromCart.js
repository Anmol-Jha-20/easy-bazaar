import SummaryApi from "../common/index.js";
import { toast } from "react-toastify";

const removeFromCart = async (productId) => {
  try {
    const res = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: productId }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }

    return data;
  } catch (err) {
    toast.error("Something went wrong");
    return { success: false };
  }
};

export default removeFromCart;
