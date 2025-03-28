"use client";

import React from "react";
import { Card } from "antd";
import { HeartFilled } from "@ant-design/icons";
import Image from "next/image";
import { NFTCardProps } from "@/type/common";
import { CARD_TYPE } from "@/src/constants/common";
import "./NFTCard.scss";

export default function NFTCard({ imageList, card }: Readonly<NFTCardProps>) {
  const { category, imageId, title, price, author, isFavorite } = card;
  const authorName = author.firstName.concat("_", author.lastName);
  const cardType = !CARD_TYPE.includes(category) ? "Common" : category;
  const customLoader = ({ src }: { src: string }) => {
    return src;
  };

  return (
    <Card className="nft-card relative p-4 h-[365px] w-[267px] shadow-xl text-white">
      <div
        className={`card-image ${cardType.toLowerCase()} relative h-[235px] flex justify-end items-center flex-col`}
      >
        <div className="card-image__category absolute top-2 left-2 text-white text-sm font-semibold px-4 py-2 rounded-md">
          {category}
        </div>
        <button className="absolute top-3 right-3 card-image__favorite-heart">
          <HeartFilled
            type="heart"
            style={{
              color: isFavorite ? "#E9A5F1" : "white",
            }}
          />
        </button>

        <Image
          src={imageList[imageId]}
          alt="nft game character"
          className="object-cover rounded-xl"
          height={197}
          width={267}
        />
      </div>

      <div className="content-info flex flex-col items-center justify-center pt-6 text-white">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-base font-bold overflow-hidden text-ellipsis whitespace-nowrap w-[50%] text-left">
            {title}
          </h2>
          <div className="flex items-center justify-center">
            <Image
              src="/logos_ethereum.svg"
              alt="ethereum icon"
              className="mr-1"
              height={14}
              width={14}
            />
            <span>{price} ETH</span>
          </div>
        </div>
        <div className="flex items-center justify-start mt-4 text-sm w-full">
          <div className="content-info__author-avatar relative bg-white w-8 h-8 flex justify-center items-center mr-3">
            <Image
              loader={customLoader}
              src={author.avatar}
              alt="author avatar"
              width={28}
              height={28}
            />
            <div className="content-info__status bg-black w-3 h-3 flex justify-center items-center">
              <Image
                src="/ic_round-verified.svg"
                alt="profile"
                width={8}
                height={8}
              />
            </div>
          </div>
          <span>{authorName}</span>
        </div>
      </div>
    </Card>
  );
}
