import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js";

const config = resolveConfig(tailwindConfig);

const pixelValue = (value) => {
  if (typeof value === "string") {
    return Number(value.replace("px", ""));
  }
  return value;
};

const screenSizes = Object.entries(config.theme.screens).toSorted((a, b) => pixelValue(b[1]) - pixelValue(a[1]));

export const getBreakpointImage = (urls = {}) => {
  for (const [breakpoint, pixels] of screenSizes) {
    if (window.matchMedia(`(min-width: ${pixels})`).matches) {
      return Object.entries(urls).find(([key]) => key === breakpoint)?.[1] ?? urls.default;
    }
  }
  return urls.default;
};
