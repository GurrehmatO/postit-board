import { makeStyles } from "@material-ui/core";

export default makeStyles({
  note: {
    border: "2px solid black",
    margin: 10,
    maxWidth: 250,
  },
  titleBar: {
    width: "calc(100% + 2px)",
    background: "rgba(0, 0, 0, 0.1)",
  },
  noteMain: {
    padding: 10,
    width: "100%",
  },
  delete: {
    color: "black",
    width: 20,
    height: 20,
    // margin: 3,
  },
});
