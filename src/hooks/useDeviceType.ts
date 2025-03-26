import { useState, useEffect } from "react";

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setDeviceType("mobile");
      } else if (width >= 768 && width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    // Set initial device type on load
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
};

export default useDeviceType;
