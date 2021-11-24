import { globalStyle } from "@vanilla-extract/css";

globalStyle("html body", {
  margin: 0,
  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen"
       "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue"
       sans-serif`,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

globalStyle("code", {
  fontFamily: `"Iosevka", source-code-pro, Menlo, Monaco, Consolas, "Courier New",
     monospace`,
});
