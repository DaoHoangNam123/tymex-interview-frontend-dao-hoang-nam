"use client";

import { Button, List } from "antd";
import NFTCard from "../Card/NFTCard";
import React, { useEffect, useState, useCallback, memo } from "react";
import { getCards } from "@/store/market/marketSlice";
import { useMarketDispatch, useMarketSelector } from "@/store/hooks";
import SkeletonList from "@/components/Skeleton/skeleton";
import { isEmpty } from "lodash";
import { IMAGE_LIST } from "@/src/constants/common";
import useDeviceType from "@/src/hooks/useDeviceType";
import { loading, marketCardList } from "@/src/store/market/marketSelector";
import { getColumns } from "@/src/utils/common";
import clsx from "clsx";
import "./styles/cardList.scss";

const EmptyMessage = memo(() => (
  <div 
    className="text-gray-500 w-full h-full font-medium text-3xl text-center py-8"
    role="status"
    aria-label="No cards found"
  >
    No cards found
  </div>
));

EmptyMessage.displayName = "EmptyMessage";

const CardList = ({ numberOfCards }: { numberOfCards: number }) => {
  const [visibleItems, setVisibleItems] = useState(numberOfCards);
  const dispatch = useMarketDispatch();
  const { width } = useDeviceType();
  const cardList = useMarketSelector(marketCardList);
  const isLoading = useMarketSelector(loading);

  const handleViewMore = useCallback(() => {
    setVisibleItems((prev) => prev + 20);
  }, []);

  useEffect(() => {
    setVisibleItems(numberOfCards);
  }, [numberOfCards]);

  useEffect(() => {
    const fetchData = () => {
      dispatch(getCards());
    };

    fetchData();

    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const renderCard = useCallback((item: any) => (
    <List.Item key={item.id}>
      <NFTCard
        card={{ ...item, imageId: item.imageId % 4 }}
        imageList={IMAGE_LIST}
      />
    </List.Item>
  ), []);

  let content: React.ReactNode;

  if (isLoading) {
    content = <SkeletonList colums={getColumns(width)} />;
  } else if (isEmpty(cardList)) {
    content = <EmptyMessage />;
  } else {
    content = (
      <List
        itemLayout="horizontal"
        grid={{
          gutter: 16,
          column: getColumns(width),
        }}
        dataSource={cardList.slice(0, visibleItems)}
        renderItem={renderCard}
        className="pr-3"
      />
    );
  }

  return (
    <section className="card-list-container" aria-label="NFT cards">
      <div 
        className={clsx(
          "card-list scrollbar mt-[70px]",
          { "min-h-[200px]": !isLoading && !isEmpty(cardList) }
        )} 
        key="card-list"
      >
        {content}
      </div>
      {visibleItems < cardList.length && (
        <div className="flex items-center justify-center mt-[55px]">
          <Button
            onClick={handleViewMore}
            className="card-list__view-more w-[326px]"
            aria-label="Load more cards"
          >
            View More
          </Button>
        </div>
      )}
    </section>
  );
};

export default memo(CardList);
