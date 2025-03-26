"use client";

import React from "react";
import { Button } from "antd";
import NavbarMenu from "@/components/Menu/menu";
import Icon from "@/components/Icon/icon";
import { HEADER_MENU } from "@/src/constants/common";
import "./header.scss";

const GlobeDropdownBtn = () => {
  return (
    <span className="flex items-center">
      <Icon type="globe" />
      <Icon type="dropdown" />
    </span>
  );
};

const Header = () => {
  return (
    <header className="header w-full text-white pt-8 pb-8 h-[84px]">
      <main className="min-w-full mx-auto px-4 flex items-center justify-between">
        <div className="flex flex-1 items-center justify-around">
          <NavbarMenu
            items={HEADER_MENU}
            default="marketplace"
            className="nav-menu"
          />
        </div>
        <div className="flex items-center gap-x-4 w-100">
          <Button className="wallet-btn">Connect Wallet</Button>
          <div>
            <Button
              className="globe-icon"
              type="default"
              icon={<GlobeDropdownBtn />}
              onClick={() => console.log("Globe icon clicked")}
            />
          </div>
        </div>
      </main>
    </header>
  );
};
export default Header;
