import { Button, InputBase } from "@material-ui/core";
import React, { useRef } from "react";
import { ColType, ActionType } from "../../App/AppState";
import Note from "../Note/Note";
import useStyles from "./Column.style";

type columnProps = ColType & {
  dispatch: React.Dispatch<ActionType>;
};
const Column = ({ id, heading, notes, dispatch }: columnProps) => {
  const headingRef = useRef<HTMLInputElement>(null);
  const classes = useStyles();

  return (
    <div className={classes.column}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          headingRef && headingRef?.current?.blur();
        }}
      >
        <InputBase
          value={heading}
          placeholder={"Enter Column Heading..."}
          onChange={(e) => {
            dispatch({
              type: "EDIT_COL_HEADING",
              payload: { col: id, heading: e.target.value },
            });
          }}
          autoFocus={notes.length === 0}
          className={classes.colHeading}
          inputRef={headingRef}
        />
      </form>
      <div className={classes.notesContainer}>
        {notes.map((note) => (
          <Note {...note} colId={id} dispatch={dispatch} key={note.id} />
        ))}
      </div>
      <Button
        onClick={() => dispatch({ type: "ADD_NOTE", payload: { col: id } })}
      >
        Add Note
      </Button>
      <Button onClick={() => dispatch({ type: "DELETE_COL", payload: id })}>
        Delete Column
      </Button>
    </div>
  );
};
export default Column;
