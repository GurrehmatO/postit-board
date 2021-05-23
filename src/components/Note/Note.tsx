import React, { useRef, useState } from "react";
import { NoteType, ActionType } from "../../App/AppState";
import { IconButton, InputBase, Paper } from "@material-ui/core";
import useStyles from "./Note.style";
import { Delete, Brush } from "@material-ui/icons";
import { Draggable } from "react-beautiful-dnd";
import NoteThemer from "./NoteThemer";

type NoteProps = NoteType & {
  dispatch: React.Dispatch<ActionType>;
  colId: string;
  index: number;
};

const Note = ({
  id,
  heading,
  content,
  color,
  dispatch,
  colId,
  index,
}: NoteProps) => {
  const contentRef = useRef<HTMLInputElement>(null);
  const classes = useStyles();
  const [themerOpen, setThemerOpen] = useState<boolean>(false);

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
            <IconButton onClick={() => setThemerOpen(true)}>
              <Brush className={classes.delete} />
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
                    },
                  });
                }}
                className={classes.noteHeading}
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
                    content: e.target.value,
                  },
                })
              }
              placeholder="Take a note..."
              className={classes.noteText}
            />
          </div>
          <NoteThemer
            color={color}
            open={themerOpen}
            setOpen={setThemerOpen}
            colId={colId}
            id={id}
            dispatch={dispatch}
            classes={classes}
          />
        </Paper>
      )}
    </Draggable>
  );
};

export default Note;
