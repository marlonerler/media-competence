import * as Users from "./users";
import * as Utility from "./utility";

import { Session } from ".";
import WebSocket from "ws";

export function handleWebSocket(ws: WebSocket, data: Session): void {
  console.log(`websocket connected.`);
  if (!data) {
    console.error("no session");
    return;
  }

  ws.on("message", async (message) => {
    const [channel, ...rest] = Utility.parseMessage(message);
    const response: string = await handleMessage(data, channel, ...rest);
    ws.send(`${channel}\n${response}`);
  });
}

async function handleMessage(
  data: Session,
  channel: string,
  ...rest: string[]
): Promise<string> {
  switch (channel) {
    case "sign-up":
      return await handleSignUp(data, rest as [string, string, string]);
    case "sign-in":
      return await handleSignIn(data, rest as [string, string]);
    default:
      return "";
  }
}

async function handleSignUp(
  data: Session,
  rest: [string, string, string]
): Promise<string> {
  const result = await Users.signUp(...rest);
  switch (result) {
    case Users.Result.OK:
      data.username = rest[0];
      return `ok\n${rest[1]}`;
    case Users.Result.ErrUsernameTaken:
      return "err-uname-taken";
    default:
      return "err";
  }
}

async function handleSignIn(
  data: Session,
  rest: [string, string]
): Promise<string> {
  const result = await Users.signIn(...rest);
  switch (result) {
    case Users.Result.OK:
      data.username = rest[0];
      return `ok\n${rest[1]}`;
    case Users.Result.ErrUsernameNoExist:
      return "err-no-user";
    case Users.Result.ErrWrongPassword:
      return "err-password";
    default:
      return "err";
  }
}
