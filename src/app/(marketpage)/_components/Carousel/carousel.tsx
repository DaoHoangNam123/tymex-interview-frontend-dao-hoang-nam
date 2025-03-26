"use client";

import Image from "next/image";
import NewArrival from "@/public/new-arrival.png";
import BannerCard from "./components/card";
import { CHARACTER_IMAGE } from "@/src/constants/common";
import useDeviceType from "@/src/hooks/useDeviceType";
import "./carousel.scss";

const Carousel = () => {
  const { width, deviceType } = useDeviceType();
  return (
    <div className="carousel">
      <div className="relative flex items-center justify-center md:pt-8 xl:pt-16 px-10 z-10">
        <div className="relative flex flex-col items-center justify-between z-10 md:w-[800px] md:h-[500-px] xl:w-[1093px] xl:h-[644px]">
          <div className="flex flex-1 items-center justify-center">
            <Image
              src={NewArrival}
              width={
                deviceType === "desktop"
                  ? 1000
                  : deviceType === "tablet"
                  ? 800
                  : 500
              }
              height={
                deviceType === "desktop"
                  ? 644
                  : deviceType === "tablet"
                  ? 500
                  : 400
              }
              alt="carousel"
            />
          </div>
          <div className="carousel__character-list flex items-center justify-center h-[200px] xl:h-[250px]">
            <div className="w-full h-full px-8 flex justify-between items-center gap-16 ">
              {CHARACTER_IMAGE.map((char) => (
                <BannerCard
                  name={char.name}
                  imageSrc={char.img}
                  width={500}
                  height={324}
                  key={char.name}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="carousel__character relative not-lg:hidden">
          <Image
            src="/the-dj-character.png"
            alt="The DJ"
            width={width > 1280 ? 400 : 300}
            height={width > 1280 ? 600 : 400}
            className="object-cover"
          />
          <div className="carousel__character-name flex items-center justify-start pl-10 lg:w-[300px] lg:h-[100px] xl:w-[437px] xl:h-[170px] ">
            <span className="name lg:text-5xl xl:text-7xl">The DJ</span>
          </div>
        </div>
      </div>
      <div className="carousel__banner h-[200px] xl:h-[250px]"></div>
    </div>
  );
};
export default Carousel;
