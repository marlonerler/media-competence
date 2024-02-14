try {
  const address = `ws://${window.location.hostname}:${window.location.port}`;
  window.ws = new WebSocket(address);

  ws.onopen = () => {
    navTo("control");
  };
  ws.onmessage = handleMessage;
} catch (error) {
  console.error(error);
}

function handleMessage(message) {
  const [channel, ...rest] = message.data.split("\n");
  console.log(channel, rest);
  if (channel != "slide") return;

  showText("next-description", rest[0]);
  showText("prev-description", rest[1]);
}

function start() {
  ws.send("control-start");
}

function clickNext() {
  ws.send("control-next");
}

function clickPrev() {
  ws.send("control-prev");
}
