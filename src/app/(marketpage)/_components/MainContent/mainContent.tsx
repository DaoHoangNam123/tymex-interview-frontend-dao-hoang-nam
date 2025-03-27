"use client";

import Image from "next/image";
import { lazy } from "react";
import "./mainContent.scss";

const CategoryBar = lazy(() => import("../CategoryBar/categoryBar"));
const Sidebar = lazy(() => import("../Sidebar/sidebar"));
const CardList = lazy(() => import("../CardList/cardList"));

const MainContent = () => {
  return (
    <div className="main-content flex flex-col items-start justify-center pt-4 sm:pt-8 md:pt-16 xl:pt-34">
      <div className="w-full flex items-start justify-center gap-5 sm:px-10 lg:px-15 xl:px-20 2xl:px-30">
        <div className="hidden md:flex">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 max-w-3/5">
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
