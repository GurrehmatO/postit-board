import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  app: {
    width: "100%",
    minWidth: "100vh",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      height: "100vh",
    },
  },
  appTitle: {
    fontSize: 30,
    alignSelf: "center",
    left: 0,
    top: 0,
  },
  colContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 20,
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  columnAndButton: {
    alignSelf: "flex-start",
    minWidth: "100vw",
    height: "calc(100vh - 30px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
      height: "unset",
    },
  },
}));
