// import { Button } from "@material-ui/core";
import React, { useEffect, useReducer } from "react";
import Column from "../components/Column/Column";
import { initialState, notesReducer } from "./AppState";
import { Button, Typography } from "@material-ui/core";
import useStyles from "./App.style";

const App = () => {
  const [columns, dispatch] = useReducer(notesReducer, initialState);
  const classes = useStyles();

  useEffect(() => {
    if (columns.length === 0) {
      dispatch({ type: "ADD_COL" });
    }
  }, [columns]);

  return (
    <div className={classes.app}>
      <Typography className={classes.appTitle}>POSTIT BOARD</Typography>
      <div className={classes.colContainer}>
        {columns.map((column) => (
          <Column dispatch={dispatch} {...column} key={column.id} />
        ))}
      </div>
      <Button onClick={() => dispatch({ type: "ADD_COL" })}>add column</Button>
    </div>
  );
};

export default App;
