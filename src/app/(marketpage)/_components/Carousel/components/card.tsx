"use client";

import Image from "next/image";
import React from "react";

interface AssassinCardProps {
  name: string;
  imageSrc: string;
}

const BannerCard = ({ name, imageSrc }: AssassinCardProps) => {
  return (
    <div className="relative w-50 h-56 flex flex-col items-center justify-center">
      {/* Character Image */}
      <Image
        src={imageSrc}
        alt={name}
        width={200}
        height={224}
        className="relative object-cover"
      />
    </div>
  );
};

export default BannerCard;
