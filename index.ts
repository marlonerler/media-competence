import Crypto from "crypto";
import Express from "express";
import ExpressWs from "express-ws";
import ExpressSession from "express-session";

const app = Express();
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
ExpressWs(app);

app.ws("/", (ws) => {
  ws.on("message", (data) => {
    console.log(data);
    ws.send(`You said: "${data}"`);
  });
});

app.use("/tests", Express.static("Tests"));

app.get("/", (req, res) => {
  if (req.session.views) {
    req.session.views += 1;
    res.end(`Visit number ${req.session.views}`);
  } else {
    req.session.views = 1;
    res.end("Welcome!");
  }
});

app.listen(8000);
