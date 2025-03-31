"use client";

import React, { memo } from "react";
import Image from "next/image";
import NewArrival from "@/public/new-arrival.png";
import BannerCard from "./components/card";
import { CHARACTER_IMAGE } from "@/src/constants/common";
import useDeviceType from "@/src/hooks/useDeviceType";
import { getHeightAndWidth } from "@/src/utils/common";
import clsx from "clsx";
import "./styles/carousel.scss";

const CharacterList = memo(({ width }: { width: number }) => (
  <div className="carousel__character-list w-full flex flex-1/2 h-1/3 items-center justify-center md:pt-3 lg:pt-5">
    <div className="w-full h-full flex justify-center items-center gap-5 sm:px-8 lg:gap-10 xl:gap-16 2xl:gap-20">
      {CHARACTER_IMAGE.map((char) => (
        <BannerCard
          name={char.name}
          imageSrc={char.img}
          key={char.name}
          {...getHeightAndWidth(width, "banner-card")}
        />
      ))}
    </div>
  </div>
));

CharacterList.displayName = "CharacterList";

const DJCharacter = memo(({ width }: { width: number }) => (
  <div className="carousel__character w-1/3 relative not-lg:hidden">
    <Image
      src="/the-dj-character.png"
      alt="The DJ"
      className="object-cover"
      {...getHeightAndWidth(width, "the-dj-image")}
      priority
    />
    <div className="carousel__character-name flex items-center justify-start pl-10 lg:w-[300px] lg:h-[100px] xl:w-[437px] xl:h-[170px]">
      <span className="name lg:text-5xl xl:text-7xl">The DJ</span>
    </div>
  </div>
));

DJCharacter.displayName = "DJCharacter";

const Carousel = () => {
  const { width } = useDeviceType();

  return (
    <section className="carousel" aria-label="Featured characters">
      <div className="relative flex items-center justify-between md:pt-8 xl:pt-16 md:px-10 xl:x-16 z-10">
        <div className="flex flex-1 flex-col items-center justify-around xl:gap-5 z-10 h-[250px] md:h-[300px] lg:h-[400px] xl:h-[600px]">
          <div className="flex items-center justify-center flex-1/2">
            <Image
              src={NewArrival}
              alt="New arrival banner"
              className="lg:min-h-auto lg:min-w-auto object-cover"
              {...getHeightAndWidth(width, "carousel")}
              priority
            />
          </div>
          <CharacterList width={width} />
        </div>
        <DJCharacter width={width} />
      </div>
      <div className="carousel__banner h-1/3 xl:h-[250px]" aria-hidden="true" />
    </section>
  );
};

export default memo(Carousel);
