import { act, render, screen } from "@testing-library/react";
import MainContent from "@/src/app/(marketpage)/_components/MainContent/mainContent";
import "@testing-library/jest-dom";
import { Suspense } from "react";

jest.mock("next/image", () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
));

jest.mock(
  "@/src/app/(marketpage)/_components/CategoryBar/categoryBar",
  () => () => {
    return <div>Category Component</div>;
  }
);

jest.mock("@/src/app/(marketpage)/_components/Sidebar/sidebar", () => () => {
  return <div>Sidebar Component</div>;
});

jest.mock("@/src/app/(marketpage)/_components/CardList/cardList", () => ({
  __esModule: true,
  default: () => <div>CardList Component with 20 cards</div>,
}));

describe("MainContent Component", () => {
  it("renders Category Component", async () => {
    await act(async () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <MainContent />
        </Suspense>
      );
    });
    expect(screen.getByText("Category Component")).toBeInTheDocument();
  });

  it("renders Sidebar Component", async () => {
    await act(async () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <MainContent />
        </Suspense>
      );
    });
    expect(screen.getByText("Sidebar Component")).toBeInTheDocument();
  });

  it("renders card list with correct number of cards", async () => {
    await act(async () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <MainContent />
        </Suspense>
      );
    });
    expect(
      screen.getByText("CardList Component with 20 cards")
    ).toBeInTheDocument();
  });

  it("renders the main view banner image", async () => {
    await act(async () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <MainContent />
        </Suspense>
      );
    });
    expect(screen.getByAltText("main view banner")).toBeInTheDocument();
  });
});
