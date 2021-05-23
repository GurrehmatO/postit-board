import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  column: {
    width: "100%",
    minHeight: "50vh",
    minWidth: 272,
    padding: 20,
    maxHeight: "calc(100vh - 130px)",
    overflowY: "scroll",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "unset",
      width: "calc(100% - 40px)",
      maxHeight: "unset",
      borderBottom: "2px solid #aaaaaa",
    },
    display: "flex",
    flexDirection: "column",
  },
  colHeading: {
    fontWeight: "bold",
    fontSize: 20,
  },
  notesContainer: {
    display: "flex",
    width: "100%",
    maxWidth: 300,
    flexDirection: "column",
    alignItems: "stretch",
    alignSelf: "center",
    minHeight: 40,
  },
}));
