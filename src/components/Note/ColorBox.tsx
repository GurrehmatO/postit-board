import { ButtonBase, makeStyles } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import React from "react";

type ColorBoxProps = {
  color: string;
  onClick?: () => void;
  size?: number;
  isSelected?: boolean;
};

const useStyles = makeStyles((theme) => ({
  colorBox: {
    width: 30,
    height: 30,
    background: theme.palette.primary.main,
  },
  check: {
    color: theme.palette.primary.contrastText,
  },
}));

const ColorBox = ({
  color = "green",
  onClick,
  size,
  isSelected = false,
}: ColorBoxProps) => {
  const classes = useStyles();
  return (
    <ButtonBase
      className={classes.colorBox}
      style={{
        ...(size && { width: size, height: size }),
      }}
      disabled={!onClick}
      onClick={onClick}
      title={color}
    >
      {isSelected && <Check className={classes.check} />}
    </ButtonBase>
  );
};

export default ColorBox;
