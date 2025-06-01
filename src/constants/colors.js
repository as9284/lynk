export const COLOR_VARIANTS = {
  sky: {
    light: { bg: "bg-sky-200", ring: "ring-sky-400" },
    dark: { bg: "bg-sky-700", ring: "ring-sky-500" },
  },
  teal: {
    light: { bg: "bg-teal-200", ring: "ring-teal-400" },
    dark: { bg: "bg-teal-700", ring: "ring-teal-500" },
  },
  emerald: {
    light: { bg: "bg-emerald-200", ring: "ring-emerald-400" },
    dark: { bg: "bg-emerald-700", ring: "ring-emerald-500" },
  },
  indigo: {
    light: { bg: "bg-indigo-200", ring: "ring-indigo-400" },
    dark: { bg: "bg-indigo-700", ring: "ring-indigo-500" },
  },
  fuchsia: {
    light: { bg: "bg-fuchsia-200", ring: "ring-fuchsia-400" },
    dark: { bg: "bg-fuchsia-700", ring: "ring-fuchsia-500" },
  },
  red: {
    light: { bg: "bg-red-200", ring: "ring-red-400" },
    dark: { bg: "bg-red-700", ring: "ring-red-500" },
  },
  neutral: {
    light: { bg: "bg-neutral-200", ring: "ring-neutral-400" },
    dark: { bg: "bg-neutral-700", ring: "ring-neutral-500" },
  },
};

export const COLOR_NAMES = Object.keys(COLOR_VARIANTS);
export const DEFAULT_COLOR = "sky";

export const getColorClasses = (colorName, isDarkMode) => {
  const variant = COLOR_VARIANTS[colorName] || COLOR_VARIANTS[DEFAULT_COLOR];
  return isDarkMode ? variant.dark : variant.light;
};
