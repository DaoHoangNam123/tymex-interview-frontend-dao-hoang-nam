"use client";

import Image from "next/image";
import { lazy } from "react";
import "./mainContent.scss";

const CategoryBar = lazy(() => import("../CategoryBar/categoryBar"));
const Sidebar = lazy(() => import("../Sidebar/sidebar"));
const CardList = lazy(() => import("../CardList/cardList"));

const MainContent = () => {
  return (
    <div className="main-content flex flex-col items-start justify-center pt-34">
      <div className="flex items-start justify-center px-40">
        <Sidebar />
        <div className="flex flex-col flex-1 w-full">
          <CategoryBar />
          <CardList numberOfCards={25} />
        </div>
      </div>
      <div className="main-content__bottom w-full h-[418px] relative">
        <Image src={"/Frame1.png"} alt="main view banner" fill />
      </div>
    </div>
  );
};

export default MainContent;
