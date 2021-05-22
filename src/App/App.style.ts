import { makeStyles } from "@material-ui/core";

export default makeStyles({
  app: {
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  appTitle: {
    fontSize: 30,
    alignSelf: "center",
  },
  colContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
});
