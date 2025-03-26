"use client";

import Image from "next/image";
import NewArrival from "@/public/new-arrival.png";
import BannerCard from "./components/card";
import { CHARACTER_IMAGE } from "@/src/constants/common";
import "./carousel.scss";

const Carousel = () => {
  return (
    <div className="carousel">
      <div className="relative flex items-center justify-center pt-16 z-10">
        <div className="flex flex-col items-center justify-between w-[1093px] h-[644px] relative z-10">
          <Image
            src={NewArrival}
            width={1093}
            height={644}
            alt="carousel"
            className="h-auto"
          />
          <div className="carousel__character-list flex items-center justify-center">
            <div className="w-full h-24 py-4 px-8 flex justify-between items-center gap-16">
              {CHARACTER_IMAGE.map((char) => (
                <div key={char.name} className="flex flex-col items-center">
                  <BannerCard name={char.name} imageSrc={char.img} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="carousel__character w-[471px] h-[655px] relative">
          <Image
            src="/the-dj-character.png"
            alt="The DJ"
            width={471}
            height={655}
          />
          <div className="carousel__character-name flex items-center justify-start pl-10">
            <span className="name">The DJ</span>
          </div>
        </div>
      </div>
      <div className="carousel__banner"></div>
    </div>
  );
};
export default Carousel;
