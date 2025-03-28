import { render, screen } from "@testing-library/react";
import Footer from "@/src/app/(marketpage)/_components/Footer/footer";
import "@testing-library/jest-dom";

jest.mock(
  "next/link",
  () =>
    ({ children }) =>
      children
);

describe("Footer Component", () => {
  it("renders navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About us")).toBeInTheDocument();
    expect(screen.getByText("Marketplace")).toBeInTheDocument();
  });

  it("renders contact information", () => {
    render(<Footer />);
    expect(screen.getByText("01234568910")).toBeInTheDocument();
    expect(screen.getByText("tymex-talent@tyme.com")).toBeInTheDocument();
  });

  it("renders subscribe section", () => {
    render(<Footer />);
    expect(
      screen.getByPlaceholderText("Your email address")
    ).toBeInTheDocument();
    expect(screen.getByText("Subscribe")).toBeInTheDocument();
  });

  it("renders footer bottom links", () => {
    render(<Footer />);
    expect(
      screen.getByText("©2023 Tyme - Edit. All Rights reserved.")
    ).toBeInTheDocument();
  });
});
