import { IUserType, USER_DELETE, USER_SAVE } from "./user-type";

export const saveUser = (user: IUserType) => ({
  type: USER_SAVE,
  payload: user,
});

export const deleteUser = () => ({
  type: USER_DELETE,
});

type UserActionType =
  | ReturnType<typeof saveUser>
  | ReturnType<typeof deleteUser>;

const initialUserState: IUserType = {
  id: "",
  nickname: "",
};

function userState(
  state: IUserType = initialUserState,
  action: UserActionType
): IUserType {
  switch (action.type) {
    case USER_SAVE:
      return {
        id: action.payload.id,
        nickname: action.payload.nickname,
      };
    case USER_DELETE:
      return initialUserState;
    default:
      return state;
  }
}

export default userState;
