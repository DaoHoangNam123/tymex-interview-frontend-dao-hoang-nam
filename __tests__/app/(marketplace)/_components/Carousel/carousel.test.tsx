import { render, screen } from "@testing-library/react";
import { CHARACTER_IMAGE } from "@/src/constants/common";
import useDeviceType from "@/src/hooks/useDeviceType";
import Carousel from "@/src/app/(marketpage)/_components/Carousel/carousel";

jest.mock("@/src/hooks/useDeviceType");

describe("Carousel Component", () => {
  const mockUseDeviceType = useDeviceType as jest.MockedFunction<
    typeof useDeviceType
  >;

  beforeEach(() => {
    mockUseDeviceType.mockReset();
  });

  test("renders images based on device large width", () => {
    mockUseDeviceType.mockReturnValue({ deviceType: "desktop", width: 1380 });

    render(<Carousel />);

    const carouselImage = screen.getByAltText("carousel");
    expect(carouselImage).toHaveAttribute("width", "1000");
    expect(carouselImage).toHaveAttribute("height", "644");

    CHARACTER_IMAGE.forEach((char) => {
      const characterImage = screen.getByAltText(char.name);
      expect(characterImage).toHaveAttribute("width", "200");
      expect(characterImage).toHaveAttribute("height", "224");
    });
  });

  test("renders images for smaller screen", () => {
    mockUseDeviceType.mockReturnValue({ deviceType: "mobile", width: 740 });

    render(<Carousel />);

    const carouselImage = screen.getByAltText("carousel");
    expect(carouselImage).toHaveAttribute("width", "400");
    expect(carouselImage).toHaveAttribute("height", "200");

    CHARACTER_IMAGE.forEach((char) => {
      const characterImage = screen.getByAltText(char.name);
      expect(characterImage).toHaveAttribute("width", "100");
      expect(characterImage).toHaveAttribute("height", "80");
    });
  });

  test("renders 'The DJ' character image", () => {
    mockUseDeviceType.mockReturnValue({ deviceType: "tablet", width: 1380 });

    render(<Carousel />);

    const djImage = screen.getByAltText("The DJ");
    expect(djImage).toHaveAttribute("width", "400");
    expect(djImage).toHaveAttribute("height", "600");
  });

  test("renders BannerCard components", () => {
    mockUseDeviceType.mockReturnValue({ deviceType: "desktop", width: 1536 });

    render(<Carousel />);

    CHARACTER_IMAGE.forEach((char) => {
      const bannerCard = screen.getByAltText(char.name);
      expect(bannerCard).toBeInTheDocument();
    });
  });

  test("displays character names", () => {
    mockUseDeviceType.mockReturnValue({ deviceType: "desktop", width: 1536 });

    render(<Carousel />);

    const djName = screen.getByText("The DJ");
    expect(djName).toBeInTheDocument();
  });
});
