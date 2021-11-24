import { style } from "@vanilla-extract/css";

export const AppStyle = style({
  textAlign: "center",
});

export const AppHeaderStyle = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#282c34",
  color: "#fff",
  fontSize: "calc(10px + 2vmin)",
});
