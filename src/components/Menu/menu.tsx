"use client";

import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

type NavbarMenuProps = {
  items: MenuItem[];
  default: string;
  className?: string;
};

const NavbarMenu = ({
  items,
  default: defaultKey,
  className,
}: NavbarMenuProps) => {
  const [current, setCurrent] = useState(defaultKey);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      theme="dark"
      className={className}
    />
  );
};

export default NavbarMenu;
