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

export interface UserAccount {
  username: Username;
  hashedPassword: string;
  alias: string;
}

//tracking
export const users = new Map<Username, UserAccount>();
export const passwordStat = {
  long: 0,
  lower: 0,
  upper: 0,
  number: 0,
  symbol: 0,
  noSequence: 0,
  total: 0,
};
export const emails: string[] = [];

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

  const isCorrect: boolean = await Utility.compareHash(
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
  if (Utility.checkIsEmail(username) == false) return Result.ErrNoValidEmail;

  evaluatePassword(password);
  addEmail(username);

  console.log(emails);
  console.log(passwordStat);

  const hashedPassword: string = await Utility.hash(password);
  const newAccount: UserAccount = {
    username,
    alias,
    hashedPassword,
  };
  users.set(username, newAccount);

  return Result.OK;
}

export function evaluatePassword(password: string): void {
  let isLong = password.length >= 12;
  let hasLowerLetter = /[a-z]/.test(password);
  let hasUpperLetter = /[A-Z]/.test(password);
  let hasNumber = /[0-9]/.test(password);
  let hasSymbol = /[^\w]/.test(password);
  let hasSequence =
    /(01|12|23|34|45|56|67|89|90|09|98|87|76|65|54|43|32|21|10)/.test(password);

  passwordStat.total += 1;
  if (isLong) passwordStat.long += 1;
  if (hasLowerLetter) passwordStat.lower += 1;
  if (hasUpperLetter) passwordStat.upper += 1;
  if (hasNumber) passwordStat.number += 1;
  if (hasSymbol) passwordStat.symbol += 1;
  if (!hasSequence) passwordStat.noSequence += 1;
}

export function addEmail(email: string): void {
  const [name, domain] = email.split("@");
  const protectedName = name
    .split("")
    .map((x, i) => (i > 1 ? "*" : x))
    .join("");
  const protectedEmail = `${protectedName}@${domain}`;
  emails.push(protectedEmail);
}

export function getAlias(username: string): string | undefined {
  return users.get(username)?.alias;
}
