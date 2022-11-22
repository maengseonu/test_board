export const USER_SAVE = "user/USER_SAVE" as const;
export const USER_DELETE = "user/USER_DELETE" as const;

export interface IUserType {
  nickname: string;
  id: string;
}
