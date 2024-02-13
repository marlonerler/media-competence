import * as Utility from "./utility";

//types
export type Username = string;

export enum Result {
  OK,

  ErrMissingData,

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
  if (!userAccount)
    return Utility.errorAndReturn(
      "user does not exist",
      Result.ErrUsernameNoExist
    );

  const isCorrect: boolean = await Bun.password.verify(
    password,
    userAccount.hashedPassword
  );
  console.log(isCorrect, userAccount.hashedPassword);
  if (!isCorrect)
    return Utility.errorAndReturn("password wrong", Result.ErrWrongPassword);

  return Result.OK;
}

export async function signUp(
  username: string,
  alias: string,
  password: string
): Promise<Result> {
  if (!(username && alias && password))
    return Utility.errorAndReturn("missing data", Result.ErrMissingData);

  if (users.has(username))
    return Utility.errorAndReturn("name taken", Result.ErrUsernameTaken);
  //TODO if (Utility.checkIsEmail(username) == false) return Result.ErrNoValidEmail;

  const hashedPassword: string = await Utility.hash(password);
  const newAccount: UserAccount = {
    username,
    alias,
    hashedPassword,
  };
  users.set(username, newAccount);

  return Result.OK;
}
