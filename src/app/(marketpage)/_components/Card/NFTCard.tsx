"use client";

import React from "react";
import { Card } from "antd";
import { HeartFilled } from "@ant-design/icons";
import Image from "next/image";
import { NFTCardProps } from "@/type/common";
import { CARD_TYPE } from "@/src/constants/common";
import { customLoader } from "@/src/utils/common";
import clsx from "clsx";
import "./styles/NFTCard.scss";

const CardImage = ({ category, imageId, imageList, isFavorite }: {
  category: string;
  imageId: string;
  imageList: Record<string, string>;
  isFavorite: boolean;
}) => {
  const cardType = !CARD_TYPE.includes(category) ? "Common" : category;
  
  return (
    <div
      className={clsx(
        "card-image relative h-[235px] flex justify-end items-center flex-col",
        cardType.toLowerCase()
      )}
    >
      <div className="card-image__category absolute top-2 left-2 text-white text-sm font-semibold px-4 py-2 rounded-md">
        {category}
      </div>
      <button 
        className="absolute top-3 right-3 card-image__favorite-heart"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <HeartFilled
          type="heart"
          style={{
            color: isFavorite ? "var(--color-favorite)" : "white",
          }}
        />
      </button>

      <Image
        src={imageList[imageId]}
        alt={`NFT ${category} character`}
        className="object-cover rounded-xl"
        height={197}
        width={267}
        priority
      />
    </div>
  );
};

const CardInfo = ({ title, price, author }: {
  title: string;
  price: number;
  author: { firstName: string; lastName: string; avatar: string; };
}) => {
  const authorName = `${author.firstName}_${author.lastName}`;
  
  return (
    <div className="content-info flex flex-col items-center justify-center pt-6 text-white">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-base font-bold overflow-hidden text-ellipsis whitespace-nowrap w-[50%] text-left">
          {title}
        </h2>
        <div className="flex items-center justify-center">
          <Image
            src="/logos_ethereum.svg"
            alt="Ethereum logo"
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
            alt={`${authorName}'s avatar`}
            width={28}
            height={28}
          />
          <div className="content-info__status bg-black w-3 h-3 flex justify-center items-center">
            <Image
              src="/ic_round-verified.svg"
              alt="Verified badge"
              width={8}
              height={8}
            />
          </div>
        </div>
        <span>{authorName}</span>
      </div>
    </div>
  );
};

export default function NFTCard({ imageList, card }: Readonly<NFTCardProps>) {
  const { category, imageId, title, price, author, isFavorite } = card;

  return (
    <Card className="nft-card relative p-4 h-[365px] w-[267px] shadow-xl text-white">
      <CardImage
        category={category}
        imageId={imageId}
        imageList={imageList}
        isFavorite={isFavorite}
      />
      <CardInfo
        title={title}
        price={price}
        author={author}
      />
    </Card>
  );
}
