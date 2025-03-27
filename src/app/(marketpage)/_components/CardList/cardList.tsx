"use client";

import { Button, List } from "antd";
import NFTCard from "../Card/NFTCard";
import React, { useEffect, useState } from "react";
import { getCards } from "@/store/market/marketSlice";
import { useMarketDispatch, useMarketSelector } from "@/store/hooks";
import SkeletonList from "@/components/Skeleton/skeleton";
import { isEmpty } from "lodash";
import { IMAGE_LIST } from "@/src/constants/common";
import useDeviceType from "@/src/hooks/useDeviceType";
import "./cardList.scss";

const EmptyMessage = () => {
  return (
    <div className="text-gray-500 w-full h-full font-medium text-3xl">
      No card found
    </div>
  );
};

const CardList = ({ numberOfCards }: { numberOfCards: number }) => {
  const [visibleItems, setVisibleItems] = useState(numberOfCards);
  const dispatch = useMarketDispatch();
  const { width } = useDeviceType();
  const cardList = useMarketSelector((state) => {
    return state.market.cardList;
  });
  const isLoading = useMarketSelector((state) => state.market.loading);

  const handleViewMore = () => {
    setVisibleItems((prev) => prev + 20);
  };

  useEffect(() => {
    setVisibleItems(numberOfCards);
  }, [numberOfCards]);

  useEffect(() => {
    const fetchData = () => {
      dispatch(getCards());
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  let content: React.ReactNode;

  if (isLoading) {
    content = (
      <SkeletonList
        colums={width > 1600 ? 4 : width > 1280 ? 3 : width > 768 ? 2 : 1}
      />
    );
  } else if (isEmpty(cardList)) {
    content = <EmptyMessage />;
  } else {
    content = (
      <List
        itemLayout="horizontal"
        grid={{
          gutter: 16,
          column: width > 1600 ? 4 : width > 1280 ? 3 : width > 768 ? 2 : 1,
        }}
        dataSource={cardList.slice(0, visibleItems)}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <NFTCard
              card={{ ...item, imageId: item.imageId % 4 }}
              imageList={IMAGE_LIST}
            />
          </List.Item>
        )}
        className="pr-3"
      />
    );
  }

  return (
    <>
      <div className="card-list scrollbar mt-[70px]" key="card-list">
        {content}
      </div>
      {visibleItems < cardList.length && (
        <div className="flex items-center justify-center mt-[55px]">
          <Button
            onClick={handleViewMore}
            className="card-list__view-more w-[326px]"
          >
            View More
          </Button>
        </div>
      )}
    </>
  );
};

export default CardList;
