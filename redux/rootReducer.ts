import { combineReducers } from "redux";
import userState from "./user/user";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import boardState from "./board/board";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  userState,
  boardState,
});

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
