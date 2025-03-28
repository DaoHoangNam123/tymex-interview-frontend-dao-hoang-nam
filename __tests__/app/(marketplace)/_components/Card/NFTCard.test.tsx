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

    expect(screen.getByText("Epic NFT")).toBeInTheDocument();

    expect(screen.getByText("2.5 ETH")).toBeInTheDocument();

    expect(screen.getByText("John_Doe")).toBeInTheDocument();

    expect(screen.getByText("Epic")).toBeInTheDocument();

    const favoriteHeart = screen.getByRole("button");
    expect(favoriteHeart.firstChild).toHaveStyle("color: #E9A5F1");

    const nftImage = screen.getByAltText("nft game character");
    expect(nftImage).toBeInTheDocument();

    const avatarImage = screen.getByAltText("author avatar");
    expect(avatarImage).toBeInTheDocument();
  });

  it("show default category with an invalid category", () => {
    const invalidCategoryProps = {
      ...mockProps,
      card: { ...mockProps.card, category: "Unknown" },
    };
    render(<NFTCard {...invalidCategoryProps} />);
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it("shows the heart in white color", () => {
    const notFavoriteProps = {
      ...mockProps,
      card: { ...mockProps.card, isFavorite: false },
    };
    render(<NFTCard {...notFavoriteProps} />);
    const favoriteHeart = screen.getByRole("button");
    expect(favoriteHeart.firstChild).toHaveStyle("color: white");
  });
});
