import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NFTCardProps } from "@/type/common";
import NFTCard from "@/src/app/(marketpage)/_components/Card/NFTCard";

const mockProps: NFTCardProps = {
  imageList: ["/dj-guy-card.png"],
  card: {
    id: 1,
    tier: "Deluxe",
    createdAt: 12345678,
    theme: "Dark",
    category: "Epic",
    imageId: 0,
    title: "Epic NFT",
    price: 2.5,
    author: {
      firstName: "John",
      lastName: "Doe",
      avatar: "avatar.png",
      email: "abc@gmail.com",
      gender: "male",
      onlineStatus: "online",
    },
    isFavorite: true,
  },
};

describe("NFTCard Component", () => {
  it("renders the card with all details", () => {
    render(<NFTCard {...mockProps} />);

    // Check if title is displayed
    expect(screen.getByText("Epic NFT")).toBeInTheDocument();

    // Check if price is displayed correctly
    expect(screen.getByText("2.5 ETH")).toBeInTheDocument();

    // Check if author's full name is displayed
    expect(screen.getByText("John_Doe")).toBeInTheDocument();

    // Check if the category is displayed
    expect(screen.getByText("Epic")).toBeInTheDocument();

    // Check if the favorite heart has the correct color
    const favoriteHeart = screen.getByRole("button");
    expect(favoriteHeart.firstChild).toHaveStyle("color: #E9A5F1");

    // Check if the main image is displayed
    const nftImage = screen.getByAltText("nft game character");
    expect(nftImage).toBeInTheDocument();

    const avatarImage = screen.getByAltText("author avatar");
    expect(avatarImage).toBeInTheDocument();
  });

  it("renders with default category when an invalid category is provided", () => {
    const invalidCategoryProps = {
      ...mockProps,
      card: { ...mockProps.card, category: "Unknown" },
    };
    render(<NFTCard {...invalidCategoryProps} />);
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it("shows the heart in white color when not a favorite", () => {
    const notFavoriteProps = {
      ...mockProps,
      card: { ...mockProps.card, isFavorite: false },
    };
    render(<NFTCard {...notFavoriteProps} />);
    const favoriteHeart = screen.getByRole("button");
    expect(favoriteHeart.firstChild).toHaveStyle("color: white");
  });
});
