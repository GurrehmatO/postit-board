import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  ThemeProvider,
  createMuiTheme,
  DialogActions,
  Button,
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import React, { useEffect, useMemo, useState } from "react";
import { ActionType } from "../../App/AppState";
import colors from "../../colors";
import ColorBox from "./ColorBox";

type NoteThemerProps = {
  color: string;
  colId: string;
  id: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: React.Dispatch<ActionType>;
  classes: ClassNameMap<string>;
};

const NoteThemer = ({
  color,
  open,
  setOpen,
  colId,
  id,
  dispatch,
  classes,
}: NoteThemerProps) => {
  const [localColor, setLocalColor] = useState(color);
  const splitColors: Array<Array<string>> = useMemo(
    () =>
      Object.keys(colors).reduce(
        (acc: Array<Array<string>>, curr: string, index: number) =>
          //@ts-ignore
          index % 4 === 0
            ? [...acc, [curr]]
            : acc.map((row, rowIndex) =>
                rowIndex === acc.length - 1 ? [...row, curr] : row
              ),
        []
      ),
    []
  );

  useEffect(() => {
    if (open) {
      setLocalColor(color);
    }
  }, [open, color]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Customize this Note</DialogTitle>
      <DialogContent>
        <div className={classes.dialogCurrent}>
          <Typography className={classes.currentText}>
            Select a theme
          </Typography>
        </div>
        <div className={classes.picker}>
          {splitColors.map((row, index) => (
            <div key={index}>
              {row.map((singleColor, colorIndex) => (
                <ThemeProvider
                  theme={createMuiTheme({
                    palette: {
                      // @ts-ignore
                      primary: colors[singleColor],
                    },
                  })}
                  key={colorIndex}
                >
                  <ColorBox
                    color={singleColor}
                    size={50}
                    onClick={() => setLocalColor(singleColor)}
                    isSelected={localColor === singleColor}
                  />
                </ThemeProvider>
              ))}
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <ThemeProvider
          theme={createMuiTheme({
            palette: {
              // @ts-ignore
              primary: colors[color],
            },
          })}
        >
          <Button
            onClick={() => {
              setOpen(false);
            }}
            className={classes.dialogButton}
            color="primary"
          >
            Cancel
          </Button>
        </ThemeProvider>
        <ThemeProvider
          theme={createMuiTheme({
            palette: {
              // @ts-ignore
              primary: colors[localColor],
            },
          })}
        >
          <Button
            onClick={() => {
              dispatch({
                type: "EDIT_NOTE",
                payload: {
                  col: colId,
                  note: id,
                  color: localColor,
                },
              });
              setOpen(false);
            }}
            className={classes.dialogButton}
            color="primary"
            disabled={color === localColor}
          >
            Apply
          </Button>
        </ThemeProvider>
      </DialogActions>
    </Dialog>
  );
};

export default NoteThemer;
