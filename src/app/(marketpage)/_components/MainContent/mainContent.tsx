"use client";

import Image from "next/image";
import { lazy } from "react";
import "./styles/mainContent.scss";

const Category = lazy(() => import("../CategoryBar/categoryBar"));
const Sidebar = lazy(() => import("../Sidebar/sidebar"));
const CardList = lazy(() => import("../CardList/cardList"));

const MainContent = () => {
  return (
    <div className="main-content flex flex-col items-start justify-center pt-4 sm:pt-8 md:pt-16 xl:pt-34">
      <div className="w-full flex items-start justify-center gap-5 px-2 sm:px-5 lg:px-10 xl:px-15 2xl:px-20">
        <div className="hidden md:flex">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 relative w-full">
          <Category />
          <CardList numberOfCards={20} />
        </div>
      </div>
      <div className="main-content__bottom w-full h-[418px] relative">
        <Image src={"/Frame1.png"} alt="main view banner" fill />
      </div>
    </div>
  );
};

export default MainContent;
