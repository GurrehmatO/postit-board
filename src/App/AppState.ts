import nextId from "react-id-generator";
import colors from "../colors";
import { getRandomInt } from "../utils";

// export const ADD_COL: string = "ADD_COL";
// export const DELETE_COL: string = "DELETE_COL";
// export const ADD_NOTE: string = "ADD_NOTE";
// export const ARRANGE_COLS: string = "ARRANGE_COLS";
// export const ARRANGE_NOTES: string = "ARRANGE_NOTES";
// export const DELETE_NOTE: string = "DELETE_NOTE";
// export const EDIT_NOTE: string = "EDIT_NOTE";
// export const EDIT_COL_HEADING: string = "EDIT_COL_HEADING";

export type NoteType = {
  id: string;
  heading: string;
  content: string;
  color: string;
};
export type ColType = {
  id: string;
  heading: string;
  notes: Array<NoteType>;
};
export const initialState: Array<ColType> = [];

export type ActionType =
  | {
      type: "ADD_COL";
    }
  | {
      type: "DELETE_COL";
      payload: string;
    }
  | {
      type: "ADD_NOTE";
      payload: {
        col: string;
      };
    }
  | {
      type: "ARRANGE_COLS";
      payload: Array<ColType>;
    }
  | {
      type: "ARRANGE_NOTES";
      payload: {
        col: string;
        notes: Array<NoteType>;
      };
    }
  | {
      type: "DELETE_NOTE";
      payload: {
        col: string;
        note: string;
      };
    }
  | {
      type: "EDIT_NOTE";
      payload: {
        col: string;
        note: string;
        heading?: string;
        content?: string;
        color?: string;
      };
    }
  | {
      type: "EDIT_COL_HEADING";
      payload: {
        col: string;
        heading: string;
      };
    }
  | {
      type: "MOVE_NOTE";
      payload: {
        sourceId: string;
        sourceNotes: Array<NoteType>;
        targetId: string;
        targetNotes: Array<NoteType>;
      };
    };

export const notesReducer: (
  state: typeof initialState,
  action: ActionType
) => Array<ColType> = (state, action) => {
  switch (action.type) {
    case "ADD_COL":
      return [
        ...state,
        {
          id: nextId("col"),
          heading: "",
          notes: [],
        },
      ];
    case "DELETE_COL":
      return state.filter((column) => column.id !== action.payload);
    case "ARRANGE_COLS":
      return [...action.payload];
    case "EDIT_COL_HEADING":
      return state.map((column) =>
        column.id === action.payload.col
          ? {
              ...column,
              heading: action.payload.heading,
            }
          : column
      );
    case "ADD_NOTE":
      return state.map((column) =>
        column.id === action.payload.col
          ? {
              ...column,
              notes: [
                ...column.notes,
                {
                  id: nextId("note"),
                  heading: "",
                  content: "",
                  color:
                    Object.keys(colors)[
                      getRandomInt(0, Object.keys(colors).length)
                    ],
                },
              ],
            }
          : column
      );
    case "ARRANGE_NOTES":
      return state.map((column) =>
        column.id === action.payload.col
          ? {
              ...column,
              notes: [...action.payload.notes],
            }
          : column
      );
    case "DELETE_NOTE":
      return state.map((column) =>
        column.id === action.payload.col
          ? {
              ...column,
              notes: column.notes.filter(
                (note) => note.id !== action.payload.note
              ),
            }
          : column
      );
    case "EDIT_NOTE":
      return state.map((column) =>
        column.id === action.payload.col
          ? {
              ...column,
              notes: column.notes.map((note) =>
                note.id === action.payload.note
                  ? {
                      ...note,
                      ...(action.payload.heading && {
                        heading: action.payload.heading,
                      }),
                      ...(action.payload.content && {
                        content: action.payload.content,
                      }),
                      ...(action.payload.color && {
                        color: action.payload.color,
                      }),
                    }
                  : note
              ),
            }
          : column
      );
    case "MOVE_NOTE":
      return state.map((column) => {
        if (column.id === action.payload.sourceId) {
          return {
            ...column,
            notes: [...action.payload.sourceNotes],
          };
        }
        if (column.id === action.payload.targetId) {
          return {
            ...column,
            notes: [...action.payload.targetNotes],
          };
        }
        return column;
      });
  }
};
