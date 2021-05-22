import { DraggableLocation } from "react-beautiful-dnd";

// a little function to help us with reordering the result
export const reorder = (
  list: Array<any>,
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
/**
 * Moves an item from one list to another list.
 */
export const move = (
  source: Array<any>,
  destination: Array<any>,
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {
    source: sourceClone,
    destination: destClone,
  };

  return result;
};
