import React from "react";
import CategoryList from "../components/category/CategoryList.jsx";
import BannerProduct from "../components/product/BannerProduct.jsx";
import HorizontalCardProduct from "../components/cardProduct/HorizontalCardProduct.jsx";
import VerticalCardProduct from "../components/cardProduct/VerticalCardProduct.jsx";
import ElectronicHero from "../components/cardProduct/ElectronicHero.jsx";

function Home() {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
      <HorizontalCardProduct
        category={"watches"}
        heading={"Popular's Smart Watches"}
      />
      <ElectronicHero />
      <VerticalCardProduct
        category={"mobiles"}
        heading={"Best in SmartPhones"}
      />
      <VerticalCardProduct category={"Mouse"} heading={"Mouse"} />
      <VerticalCardProduct
        category={"camera"}
        heading={"Camera & Photography"}
      />
    </div>
  );
}

export default Home;
