import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Categorybar from "@/src/app/(marketpage)/_components/CategoryBar/categoryBar";
import { filterCategory } from "@/store/market/marketSlice";
import { useMarketDispatch, useMarketSelector } from "@/store/hooks";
import { CATERGORY_LIST } from "@/src/constants/common";

jest.mock("@/src/store/hooks", () => ({
  useMarketDispatch: jest.fn(),
  useMarketSelector: jest.fn(),
}));

jest.mock("antd", () => ({
  Button: ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick}>Open Drawer</button>
  ),
  Drawer: ({ open, onClose, children }: any) => {
    return open ? (
      <div>
        <div className="drawer-content">
          <button onClick={onClose}>Close Drawer</button>
          {children}
        </div>
      </div>
    ) : null;
  },
  Select: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="select">{children}</div>
  ),
  Slider: ({ onChange }: { onChange: () => void }) => (
    <div data-testid="slider" onChange={onChange}>
      Slider
    </div>
  ),
  Input: ({ onChange }: { onChange: () => void }) => (
    <div data-testid="input" onChange={onChange}>
      Input
    </div>
  ),
}));
describe("Categorybar", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useMarketDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useMarketSelector as unknown as jest.Mock).mockReturnValue({
      priceSlider: [0.01, 200],
      tier: "All",
      theme: "Halloween",
      time: "Latest",
      priceSort: "Low",
      input: "aaaa",
      sort: "time",
      order: "asc",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all categories as buttons", () => {
    render(<Categorybar />);

    CATERGORY_LIST.filter((e) => e !== "Sort").forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it("dispatches action when category is clicked", async () => {
    render(<Categorybar />);

    const category = CATERGORY_LIST[0];
    const categoryButton = screen.getByText(category);

    fireEvent.click(categoryButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(filterCategory(category));
    });
  });

  it("set selected class for the selected category", async () => {
    render(<Categorybar />);

    const category = CATERGORY_LIST[0];
    const categoryButton = screen.getByText(category);

    fireEvent.click(categoryButton);

    expect(categoryButton).toHaveClass("selected");
  });

  it("open the filter drawer", async () => {
    global.innerWidth = 375;
    global.dispatchEvent(new Event("resize"));

    render(<Categorybar />);
    const openDrawerButton = screen.getByText("Open Drawer");
    expect(openDrawerButton).toBeInTheDocument();
  });
  it("input category", async () => {
    global.innerWidth = 375;
    global.dispatchEvent(new Event("resize"));

    render(<Categorybar />);
    const openDrawerButton = screen.getByText("Open Drawer");
    expect(openDrawerButton).toBeInTheDocument();
  });
});
