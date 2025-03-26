import { useState, useEffect } from "react";

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState("desktop");
  const [width, setWidth] = useState(0);
  const handleResize = () => {
    const width = window.innerWidth;
    setWidth(width);

    if (width < 768) {
      setDeviceType("mobile");
    } else if (width >= 768 && width < 1024) {
      setDeviceType("tablet");
    } else {
      setDeviceType("desktop");
    }
  };

  useEffect(() => {
    // Set initial device type on load
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return { deviceType, width };
};

export default useDeviceType;
