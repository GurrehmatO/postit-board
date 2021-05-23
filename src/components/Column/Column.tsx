import {
  Button,
  createMuiTheme,
  InputBase,
  ThemeProvider,
} from "@material-ui/core";
import React, { useRef } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ColType, ActionType } from "../../App/AppState";
import Note from "../Note/Note";
import useStyles from "./Column.style";
import colors from "../../colors";

type columnProps = ColType & {
  dispatch: React.Dispatch<ActionType>;
};
const Column = ({ id, heading, notes, dispatch }: columnProps) => {
  const headingRef = useRef<HTMLInputElement>(null);
  const classes = useStyles();

  return (
    <div className={classes.column}>
      <div>
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
            className={classes.colHeading}
            inputRef={headingRef}
          />
        </form>
        <Button
          onClick={() => dispatch({ type: "ADD_NOTE", payload: { col: id } })}
        >
          Add Note
        </Button>
        <Button onClick={() => dispatch({ type: "DELETE_COL", payload: id })}>
          Delete Column
        </Button>
      </div>
      <Droppable droppableId={id}>
        {(columnProvided, columnSnapshot) => (
          <div className={classes.notesContainer} ref={columnProvided.innerRef}>
            {notes.map((note, index) => (
              <ThemeProvider
                theme={createMuiTheme({
                  palette: {
                    // @ts-ignore
                    primary: colors[note.color],
                  },
                })}
                key={note.id}
              >
                <Note {...note} colId={id} dispatch={dispatch} index={index} />
              </ThemeProvider>
            ))}
            {columnProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
export default Column;
