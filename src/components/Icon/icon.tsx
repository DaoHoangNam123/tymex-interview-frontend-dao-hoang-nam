import React from "react";
import Image from "next/image";

type IconType = {
  type: string;
};

const Icon = ({ type }: IconType) => {
  if (type === "globe") {
    return <Image src={"/globe.svg"} width={40} height={40} alt="Globe Icon" />;
  }
  if (type === "dropdown") {
    return (
      <Image
        src={"/chevron-down.svg"}
        width={40}
        height={40}
        alt="Dropdown Icon"
      />
    );
  }
  return <div></div>;
};

export default Icon;
