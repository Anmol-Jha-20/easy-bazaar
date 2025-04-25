import React, { useEffect, useState } from "react";
import moment from "moment";
import SummaryApi from "../common/index.js";
import displayINRCurrency from "../helpers/displayCurrency.js";

function OrderPage() {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: "include",
    });

    const responseData = await response.json();

    setData(responseData.data);
    console.log("order list", responseData);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div>
      {!data[0] && <p>No Order available</p>}

      <div className="p-4 w-full">
        {data.map((item, index) => {
          return (
            <div key={item._id || index}>
              <p className="font-medium text-lg ">
                {moment(item.createdAt).format("LL")}
              </p>
              <div className="border rounded">
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="grid gap-1">
                    {item?.productDetails.map((product, index) => {
                      return (
                        <div
                          key={product.productId + index}
                          className="flex gap-3 bg-slate-100"
                        >
                          <img
                            src={product.image[0]}
                            className="w-28 h-28 bg-slate-200 object-scale-down p-2"
                          />
                          <div>
                            <div className="font-medium text-lg text-ellipsis line-clamp-1">
                              {product.name}
                            </div>
                            <div className="flex items-center gap-5 mt-1">
                              <div className="text-lg text-red-500">
                                {displayINRCurrency(product.price)}
                              </div>
                              <p>Quantity : {product.quantity}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-col gap-4 p-2 min-w-[300px]">
                    <div>
                      <div className="text-lg font-medium">
                        Payment Details:
                      </div>
                      <p className="ml-1">
                        Payment ID: {item.paymentDetails?.paymentId}
                      </p>
                      <p className="ml-1">
                        Order ID: {item.paymentDetails?.razorpay_order_id}
                      </p>
                      <p className="ml-1">
                        Status: {item.paymentDetails?.payment_status || "Paid"}
                      </p>
                      <p className="ml-1">
                        Method:{" "}
                        {item.paymentDetails?.payment_method || "Razorpay"}
                      </p>
                    </div>

                    <div>
                      <div className="text-lg font-medium">
                        Shipping Details:
                      </div>
                      <p className="ml-1">
                        Address: {item.shippingAddress || "N/A"}
                      </p>
                      <p className="ml-1">City: {item.shippingCity || "N/A"}</p>
                      <p className="ml-1">
                        Pincode: {item.shippingPincode || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="font-semibold ml-auto w-fit lg:text-lg">
                  Total Amount : {displayINRCurrency(item.totalAmount)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderPage;
