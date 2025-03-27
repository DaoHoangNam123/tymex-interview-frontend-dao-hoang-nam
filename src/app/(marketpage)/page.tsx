"use client";

import React from "react";
import Header from "./_components/Header/header";
import Footer from "./_components/Footer/footer";
import Carousel from "./_components/Carousel/carousel";
import dynamic from "next/dynamic";
import Spinner from "@/components/Spinner/spinner";

const MainContent = dynamic(
  () => import("./_components/MainContent/mainContent"),
  {
    loading: () => <Spinner />,
    ssr: false,
  }
);

const MarketPage = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-col items-center justify-center text-center flex-1">
        <div className="market-page__cover-header">
          <Header />
          <Carousel />
        </div>
        <MainContent />
        <Footer />
      </div>
    </div>
  );
};

export default MarketPage;
