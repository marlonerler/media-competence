import Express from "express";
import ExpressWs from "express-ws";

const app = Express();
ExpressWs(app);

app.ws("/", (ws) => {

  ws.on("message", (data) => {
    console.log(data);
    ws.send(`You said: "${data}"`);
  });
});

app.use("/tests", Express.static("Tests"));

app.listen(8000);
