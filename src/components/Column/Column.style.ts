import { makeStyles } from "@material-ui/core";

export default makeStyles({
  column: {
    maxWidth: "60%",
    minHeight: "50vh",
    padding: 20,
    border: "2px solid #aaaaaa",
    // borderLeft: "0",

    flexGrow: 1,
  },
  colHeading: {
    fontWeight: "bold",
    fontSize: 20,
  },
  notesContainer: {
    display: "flex",
    flexDirection: "column",
    // flexWrap: "wrap",
  },
});
