"use client";
import React from "react";
import { List, Skeleton } from "antd";

const SkeletonCard = () => {
  return (
    <div className="relative p-4 rounded-[10px] h-[365px] w-[267px] shadow-xl bg-[#2a2936]">
      <Skeleton.Node active style={{ width: 235, height: 220 }} />
      <div className="content flex flex-col items-center justify-center pt-6">
        <div className="flex items-center justify-between w-full">
          <Skeleton.Node active style={{ width: 100, height: 30 }} />
          <Skeleton.Node active style={{ width: 100, height: 30 }} />
        </div>
        <div className="flex items-center justify-start mt-4 text-sm w-full">
          <Skeleton.Avatar
            active
            size={"default"}
            shape={"circle"}
            className="mr-3"
          />
          <Skeleton.Input active size={"default"} />
        </div>
      </div>
    </div>
  );
};

const SkeletonList = ({ colums }: { colums: number }) => {
  const data = Array.from({ length: 20 }, (_, i) => <SkeletonCard key={i} />);
  return (
    <List
      itemLayout="horizontal"
      grid={{ gutter: 16, column: colums }}
      dataSource={data}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  );
};
export default SkeletonList;
