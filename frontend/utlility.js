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
