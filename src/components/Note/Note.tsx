import React, { useRef } from "react";
import { NoteType, ActionType } from "../../App/AppState";
import { IconButton, InputBase, Paper } from "@material-ui/core";
import useStyles from "./Note.style";
import { Delete } from "@material-ui/icons";

type NoteProps = NoteType & {
  dispatch: React.Dispatch<ActionType>;
  colId: string;
};

const Note = ({ id, heading, content, dispatch, colId }: NoteProps) => {
  const contentRef = useRef<HTMLInputElement>(null);
  const classes = useStyles();

  return (
    <Paper className={classes.note} elevation={6}>
      <div className={classes.titleBar}>
        <IconButton
          onClick={() =>
            dispatch({ type: "DELETE_NOTE", payload: { col: colId, note: id } })
          }
        >
          <Delete className={classes.delete} />
        </IconButton>
      </div>
      <div className={classes.noteMain}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            contentRef && contentRef?.current?.focus();
          }}
        >
          <InputBase
            value={heading}
            placeholder={"Enter Note Heading..."}
            onChange={(e) => {
              dispatch({
                type: "EDIT_NOTE",
                payload: {
                  col: colId,
                  note: id,
                  heading: e.target.value,
                  content,
                },
              });
            }}
            autoFocus
          />
        </form>
        <InputBase
          value={content}
          multiline
          inputRef={contentRef}
          onChange={(e) =>
            dispatch({
              type: "EDIT_NOTE",
              payload: {
                col: colId,
                note: id,
                heading,
                content: e.target.value,
              },
            })
          }
          placeholder="Take a note..."
        />
      </div>
    </Paper>
  );
};

export default Note;
