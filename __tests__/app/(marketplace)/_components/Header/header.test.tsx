import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Header from "@/src/app/(marketpage)/_components/Header/header";
import "@testing-library/jest-dom";
import { HEADER_MENU } from "@/src/constants/common";

describe("Header Component", () => {
  it("renders navigation menu on larger screens", () => {
    render(<Header />);
    HEADER_MENU.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it("renders connect wallet button", () => {
    render(<Header />);
    expect(screen.getByText("Connect Wallet")).toBeInTheDocument();
  });

  it("opens and closes the drawer menu on mobile view", () => {
    render(<Header />);
    const menuButton = screen.getByRole("button", { name: "menu" });
    waitFor(() => {
      fireEvent.click(menuButton);
    });
    expect(screen.getByText("Menu")).toBeInTheDocument();
    waitFor(() => {
      fireEvent.click(screen.getByText("Menu"));
    });
  });
});
