export const checkDevice = (windowSize: number | null) => {
  if (!windowSize) return { DESKTOP: true };

  const MOBILE = windowSize <= 640;
  const TABLET = windowSize <= 1280;
  const DESKTOP = windowSize <= 1920;
  const LARGE_SCREEN = windowSize > 1920;

  return { MOBILE, TABLET, DESKTOP, LARGE_SCREEN };
};

export const customDebounce = <T extends (...args: Parameters<T>) => void>(
  fn: T,
  t: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, t);
  };
};

export const getHeightAndWidth = (screenWidth: number, type: string) => {
  switch (type) {
    case "carousel": {
      if (screenWidth > 1280) return { width: 1000, height: 644 };
      if (screenWidth > 768) return { width: 500, height: 300 };
      if (screenWidth > 640) return { width: 400, height: 200 };
      return { width: 300, height: 100 };
    }
    case "banner-card": {
      if (screenWidth > 1280) return { width: 200, height: 224 };
      if (screenWidth > 768) return { width: 120, height: 100 };
      if (screenWidth > 640) return { width: 100, height: 80 };
      return { width: 80, height: 50 };
    }
    case "the-dj-image": {
      if (screenWidth > 1280) return { width: 400, height: 600 };
      return { width: 300, height: 400 };
    }
    default:
      break;
  }
};

export const getColumns = (screenWidth: number) => {
  if (screenWidth > 1600) return 4;
  if (screenWidth > 1280) return 3;
  if (screenWidth > 768) return 2;
  return 1;
};

export const getFirstChar = (text: string) => {
  return text.substring(0, 1);
};
