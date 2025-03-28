"use client";

import React, { useState } from "react";
import { Button, Drawer, Menu, MenuProps } from "antd";
import Icon from "@/components/Icon/icon";
import { HEADER_MENU } from "@/src/constants/common";
import { MenuOutlined } from "@ant-design/icons";
import "./styles/header.scss";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("marketplace");

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <header className="header w-full text-white pt-8 pb-8 h-[84px]">
      <main className="w-full h-[40px] flex items-center justify-between px-4">
        <div className="hidden xl:flex flex-1 items-center justify-around">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode={"horizontal"}
            items={HEADER_MENU}
            theme="dark"
            className={
              "nav-menu mx-auto flex items-center justify-between xl:px-4"
            }
          />
        </div>
        <div className="xl:hidden">
          <Button
            icon={<MenuOutlined />}
            onClick={showDrawer}
            className="nav-menu__drawer__button"
          ></Button>
          <Drawer
            onClose={onClose}
            open={open}
            title="Menu"
            className="nav-menu__drawer"
          >
            <div className="nav-menu mx-auto flex flex-col items-start justify-between text-white">
              {HEADER_MENU.map((item) => {
                return (
                  <div
                    key={item.key}
                    className={`${current === item.key ? "selected" : ""}`}
                  >
                    {item.label}
                  </div>
                );
              })}
            </div>
          </Drawer>
        </div>
        <div className="flex justify-between items-center gap-x-4 mr-4">
          <button className="wallet-btn w-[150px] h-[40px] rounded-[4px]">
            Connect Wallet
          </button>
          <div className="flex justify-between items-center">
            <Icon type="globe" />
            <Button
              className="globe-icon"
              type="default"
              icon={<Icon type="dropdown" />}
            />
          </div>
        </div>
      </main>
    </header>
  );
};
export default Header;
