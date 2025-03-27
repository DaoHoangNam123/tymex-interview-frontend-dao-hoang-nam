import { render, screen } from "@testing-library/react";
import MainContent from "@/src/app/(marketpage)/_components/MainContent/mainContent";
import "@testing-library/jest-dom";

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

jest.mock(
  "@/src/app/(marketpage)/_components/CardList/cardList",
  () =>
    ({ numberOfCards }: { numberOfCards: number }) =>
      <div>CardList Component with {numberOfCards} cards</div>
);

describe("MainContent Component", () => {
  it("renders sidebar on larger screens", () => {
    global.innerWidth = 1575;
    window.dispatchEvent(new Event("resize"));
    const { container } = render(<MainContent />);
    console.log(container.innerHTML); // Log the rendered HTML
    expect(screen.getByText("Sidebar Component")).toBeInTheDocument();
  });

  it("renders category component", () => {
    render(<MainContent />);
    expect(screen.getByText("Category Component")).toBeInTheDocument();
  });

  it("renders card list with correct number of cards", () => {
    render(<MainContent />);
    expect(
      screen.getByText("CardList Component with 20 cards")
    ).toBeInTheDocument();
  });

  it("renders the main view banner image", () => {
    render(<MainContent />);
    expect(screen.getByAltText("main view banner")).toBeInTheDocument();
  });
});
