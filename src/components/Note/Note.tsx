import React, { useRef } from "react";
import { NoteType, ActionType } from "../../App/AppState";
import { IconButton, InputBase, Paper } from "@material-ui/core";
import useStyles from "./Note.style";
import { Delete } from "@material-ui/icons";
import { Draggable } from "react-beautiful-dnd";

type NoteProps = NoteType & {
  dispatch: React.Dispatch<ActionType>;
  colId: string;
  index: number;
};

const Note = ({ id, heading, content, dispatch, colId, index }: NoteProps) => {
  const contentRef = useRef<HTMLInputElement>(null);
  const classes = useStyles();

  return (
    <Draggable draggableId={id} index={index}>
      {(noteProvided, noteSnapshot) => (
        <Paper
          className={classes.note}
          elevation={6}
          ref={noteProvided.innerRef}
          {...noteProvided.draggableProps}
        >
          <div className={classes.titleBar} {...noteProvided.dragHandleProps}>
            <IconButton
              onClick={() =>
                dispatch({
                  type: "DELETE_NOTE",
                  payload: { col: colId, note: id },
                })
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
      )}
    </Draggable>
  );
};

export default Note;
