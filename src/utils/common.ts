export const checkDevice = (windowSize: number | null) => {
  if (!windowSize) return { DESKTOP: true };

  const MOBILE = windowSize <= 640;
  const TABLET = windowSize <= 1280;
  const DESKTOP = windowSize <= 1920;
  const LARGE_SCREEN = windowSize > 1920;

  return { MOBILE, TABLET, DESKTOP, LARGE_SCREEN };
};

export const debounceAPICalling = <T extends (...args: any[]) => void>(
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
