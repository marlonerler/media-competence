import * as Users from "./users";
import * as Utility from "./utility";

import Crypto from "crypto";
import Express from "express";
import ExpressSession from "express-session";
import ExpressWs from "express-ws";
import { handleWebSocket } from "./websocket";

//prepare app
const app = Express();

//session tracking
const sessionConfig = {
  secret: Crypto.randomBytes(8).toString("hex"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
};
if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  sessionConfig.cookie.secure = true; // serve secure cookies
}
app.use(ExpressSession(sessionConfig));
export interface Session {
  username?: Users.Username;
}
export const sessionData = new Map<string, Session>();

//websocket
ExpressWs(app);
//convert types
const expressApp: ExpressWs.Application = app as any;

//listen to ws
expressApp.ws("/", (ws, req) => {
  //@ts-ignore
  handleWebSocket(ws, sessionData.get(req.session.uuid));
});

//route
app.use("/", (req, res, next) => {
  //@ts-ignore
  if (req.session.uuid) return next();

  const uuid: string = Utility.uuid();
  //@ts-ignore
  req.session.uuid = uuid;
  sessionData.set(uuid, {});

  next();
});
app.use("/", Express.static("frontend"));

app.listen(8000);
