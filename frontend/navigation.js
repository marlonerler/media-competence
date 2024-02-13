function show(id) {
  const current = document.querySelector("main[visible]");
  if (current) {
    current.removeAttribute("visible");
  }

  document.getElementById(id).setAttribute("visible", "");
}

window.onload = () => {
    setTimeout(() => show('sign-up'), 1000)
}