import React, { useRef } from "react";
import { NoteType, ActionType } from "../../App/AppState";
import { Button, InputBase } from "@material-ui/core";

type NoteProps = NoteType & {
  dispatch: React.Dispatch<ActionType>;
  colId: string;
};

const Note = ({ id, heading, content, dispatch, colId }: NoteProps) => {
  const contentRef = useRef<HTMLInputElement>(null);

  return (
    <div className="note">
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
          className="note_heading"
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
        className="note_content"
      />
      <Button
        onClick={() =>
          dispatch({ type: "DELETE_NOTE", payload: { col: colId, note: id } })
        }
      >
        Delete Note
      </Button>
    </div>
  );
};

export default Note;
