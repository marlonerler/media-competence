function navTo(id) {
  const current = document.querySelector("main[visible]");
  if (current) {
    current.removeAttribute("visible");
  }

  const target = document.getElementById(id);
  target.style.animation = "none";
  target.setAttribute("visible", "");
  setTimeout(() => (target.style.animation = ""), 10);
}

function getValue(id) {
  const element = document.getElementById(id);
  if (!element) return "";
  return element.value;
}

function hide(id) {
  const element = document.getElementById(id);
  if (!element) return;
  element.setAttribute("hidden", "");
}

function show(id) {
  const element = document.getElementById(id);
  if (!element) return;
  element.removeAttribute("hidden");
}

function showText(id, text) {
  const element = document.getElementById(id);
  show(id);
  if (!element) return;
  element.innerText = text;
}

function selectTile(tile, message) {
  tile.toggleAttribute("selected");
  ws.send(`select
${message}
${tile.hasAttribute("selected")}`);
}
