import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  note: {
    border: "2px solid black",
    margin: 10,
    maxWidth: 250,
    background: theme.palette.primary.main,
  },
  titleBar: {
    width: "calc(100% + 2px)",
    background: "rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noteMain: {
    padding: 10,
    width: "100%",
  },
  delete: {
    color: theme.palette.primary.contrastText,
    width: 20,
    height: 20,
  },
  noteHeading: {
    color: theme.palette.primary.contrastText,
  },
  noteText: {
    color: theme.palette.primary.contrastText,
  },
  dialogCurrent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  currentText: {
    fontWeight: "bold",
    marginRight: 4,
  },
  picker: {
    marginTop: 20,
  },
  dialogButton: {
    fontWeight: "bold",
  },
}));
