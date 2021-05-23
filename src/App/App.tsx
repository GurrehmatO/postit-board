import React, { useEffect, useReducer } from "react";
import Column from "../components/Column/Column";
import { initialState, notesReducer } from "./AppState";
import { Button, Typography } from "@material-ui/core";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import useStyles from "./App.style";
import { reorder, move } from "../utils";

const App = () => {
  const savedState = localStorage.getItem("saved_notes");
  const [columns, dispatch] = useReducer(
    notesReducer,
    savedState ? JSON.parse(savedState) : initialState
  );
  const classes = useStyles();
  useEffect(() => {
    localStorage.setItem("saved_notes", JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    if (columns.length === 0) {
      dispatch({ type: "ADD_COL" });
    }
  }, [columns]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const notesCopy = Array.from(
        columns.find((column) => column.id === source.droppableId)?.notes || []
      );
      const newNotes = reorder(notesCopy, source.index, destination.index);

      dispatch({
        type: "ARRANGE_NOTES",
        payload: {
          col: source.droppableId,
          notes: newNotes,
        },
      });
    } else {
      const result = move(
        columns.find((column) => column.id === source.droppableId)?.notes || [],
        columns.find((column) => column.id === destination.droppableId)
          ?.notes || [],
        source,
        destination
      );

      dispatch({
        type: "MOVE_NOTE",
        payload: {
          sourceId: source.droppableId,
          sourceNotes: result.source,
          targetId: destination.droppableId,
          targetNotes: result.destination,
        },
      });
    }
  };

  return (
    <div className={classes.app}>
      <Typography className={classes.appTitle}>POSTIT BOARD</Typography>
      <div className={classes.colContainer}>
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((column) => (
            <Column dispatch={dispatch} {...column} key={column.id} />
          ))}
        </DragDropContext>
      </div>
      <Button onClick={() => dispatch({ type: "ADD_COL" })}>add column</Button>
    </div>
  );
};

export default App;
