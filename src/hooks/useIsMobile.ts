import { useEffect, useState } from "react";

export function useIsMobile(defaultValue = false) {
  const [isMobile, setIsMobile] = useState(defaultValue);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;

    const mobile = Boolean(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.exec(
        userAgent
      )
    );

    setIsMobile(mobile);
  }, []);

  return isMobile;
}
