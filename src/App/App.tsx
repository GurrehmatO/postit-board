// import { Button } from "@material-ui/core";
import React, { useEffect, useReducer } from "react";
import Column from "../components/Column";
import "./App.css";
import { initialState, notesReducer } from "./AppState";
import { Button } from "@material-ui/core";

const App = () => {
  const [columns, dispatch] = useReducer(notesReducer, initialState);

  useEffect(() => {
    if (columns.length === 0) {
      dispatch({ type: "ADD_COL" });
    }
  }, [columns]);

  return (
    <div className="App">
      {columns.map((column) => (
        <Column dispatch={dispatch} {...column} key={column.id} />
      ))}
      <Button onClick={() => dispatch({ type: "ADD_COL" })}>add column</Button>
    </div>
  );
};

export default App;
