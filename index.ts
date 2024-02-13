import Crypto from "crypto";
import Express from "express";
import ExpressSession from "express-session";
import ExpressWs from "express-ws";

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

//websocket
ExpressWs(app);
//convert types
const expressApp: ExpressWs.Application = app as any;

//listen to ws
expressApp.ws("/", (ws) => {
  ws.on("message", (data) => {
    console.log(data);
    ws.send(`You said: "${data}"`);
  });
});

//route
app.use("/", Express.static("frontend"));

app.listen(8000);
