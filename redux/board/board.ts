import { BOARD_STATE_CHANGE, IBoardActionType } from "./board-type";

export const changeBoardState = (state: IBoardActionType) => ({
  type: BOARD_STATE_CHANGE,
  payload: state,
});

type BoardActionType = ReturnType<typeof changeBoardState>;

const initialBoardState: IBoardActionType = IBoardActionType.LIST;

function boardState(
  state: IBoardActionType = initialBoardState,
  action: BoardActionType
): IBoardActionType {
  switch (action.type) {
    case BOARD_STATE_CHANGE:
      return action.payload;
    default:
      return state;
  }
}

export default boardState;
