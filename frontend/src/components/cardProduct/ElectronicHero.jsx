import React from "react";
import electronics from "../../assets/electronics.jpg";

function ElectronicHero() {
  return (
    <div>
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-12 flex flex-col md:flex-row items-center justify-between mb-10">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Upgrade Your Tech Game
          </h1>
          <p className="text-gray-600 mb-6">
            Discover the best deals on the latest electronics - from phones to
            laptops and more.
          </p>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-indigo-700 transition">
            Shop Now
          </button>
        </div>
        <img
          src={electronics}
          alt="Electronics Hero"
          className="w-full md:w-1/2 rounded-xl mt-6 md:mt-0"
        />
      </div>
    </div>
  );
}

export default ElectronicHero;
