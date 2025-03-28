"use client";

import Image from "next/image";
import React from "react";

interface CardProps {
  name: string;
  imageSrc: string;
  width: number;
  height: number;
}

const BannerCard = ({ name, imageSrc, width, height }: CardProps) => {
  return (
    <div className={`flex items-center justify-center h-full`}>
      {/* Character Image */}
      <Image
        src={imageSrc}
        alt={name}
        width={width}
        height={height}
        className="min-h-auto min-w-auto object-cover"
      />
    </div>
  );
};

export default BannerCard;
