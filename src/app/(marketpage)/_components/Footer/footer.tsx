"use client";

import { Input, Button } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-20 w-full h-[552px]">
      <div className="w-full grid md:grid-cols-3 gap-8 py-15">
        {/* Navigation Links */}
        <div className="text-left">
          <h3 className="text-lg font-bold mb-8">NAVIGATION</h3>
          <ul className="space-y-2 grid grid-cols-3 ">
            <li>Home</li>
            <li>About us</li>
            <li>Our teams</li>
            <li>Whitepaper</li>
            <li>Marketplace</li>
            <li>Roadmap</li>
            <li>FAQs</li>
            <li>News</li>
            <li>Community</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="text-left flex items-center justify-center">
          <div>
            <h3 className="text-lg font-bold mb-8">CONTACT US</h3>
            <ul className="space-y-3">
              <li className="flex items-center mb-8">
                <PhoneOutlined className="mr-2" />
                01234568910
              </li>
              <li className="flex items-center">
                <MailOutlined className="mr-2" />
                tymex-talent@tyme.com
              </li>
            </ul>
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="text-left">
          <h3 className="text-lg font-bold mb-8">
            SUBSCRIBE TO RECEIVE OUR LATEST UPDATE
          </h3>
          <div className="flex items-center justify-start gap-5">
            <Input
              placeholder="Your email address"
              className="mr-2"
              style={{
                width: "70%",
                color: "white",
                background: "black",
                borderColor: "gray",
                height: "44px",
              }}
            />
            <Button className="subcribe-btn">Subscribe</Button>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />

      {/* Footer Bottom */}
      <div className="w-full flex justify-between items-center text-gray-400 text-sm">
        <span>©2023 Tyme - Edit. All Rights reserved.</span>
        <div className="space-x-6">
          <Link href="/security">Security</Link>
          <Link href="/legal">Legal</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
