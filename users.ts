import * as Utility from "./utility";

//types
export type Username = string;

export enum Result {
  OK,

  ErrWrongPassword,
  ErrUsernameTaken,
  ErrUsernameNoExist,
  ErrNoValidEmail,
}

export interface Session {
  username: Username;
  alias: string;
}
export interface UserAccount {
  username: Username;
  hashedPassword: string;
  alias: string;
}

//tracking
export const sessions = new Map<Username, Session>();
export const users = new Map<Username, UserAccount>();

//methods
export async function signIn(
  username: Username,
  password: string
): Promise<Result> {
  const userAccount: UserAccount | undefined = users.get(username);
  if (!userAccount) return Result.ErrUsernameNoExist;

  const reference: string = await Utility.hash(password);
  if (reference != userAccount.hashedPassword) return Result.ErrWrongPassword;

  return Result.OK;
}

export async function signUp(
  username: string,
  alias: string,
  password: string
): Promise<Result> {
  if (users.has(username)) return Result.ErrUsernameTaken;
  if (Utility.checkIsEmail(username) == false) return Result.ErrNoValidEmail;

  const hashedPassword: string = await Utility.hash(password);
  const newAccount: UserAccount = {
    username,
    alias,
    hashedPassword,
  };
  users.set(username, newAccount);

  return Result.OK;
}
