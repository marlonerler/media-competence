try {
  const address = `ws://${window.location.hostname}:${window.location.port}`;
  window.ws = new WebSocket(address);

  ws.onopen = () => {
    navTo("sign-up");
  };
  ws.onmessage = handleMessage;
} catch (error) {
  navTo("error");
  console.error(error);
}

function handleMessage(message) {
  const [channel, ...rest] = message.data.split("\n");
  console.log(channel, rest);
  switch (channel) {
    case "sign-up":
      return handleSignUpResponse(rest);
    case "sign-in":
      return handleSignInResponse(rest);
    case "slide":
      return handleSlideChange(rest);
  }
}

function signUp() {
  const email = getValue("sign-up-email");
  const alias = getValue("sign-up-alias");
  const password1 = getValue("sign-up-password-1");
  const password2 = getValue("sign-up-password-2");

  if (/^(\w+)\@(\w+)\.(\w+)$/.test(email) == false) {
    showText("err-sign-up-email", "Please enter your e-mail address");
    //return;
  }
  hide("err-sign-up-email");

  if (!password1) {
    showText("err-sign-up-passwords", "Please enter a password");
    return;
  }
  if (password1 != password2) {
    showText(
      "err-sign-up-passwords",
      "Sorry, those passwords don't match. Please try again"
    );
    return;
  }
  hide("err-sign-up-passwords");

  navTo("loading");
  ws.send(
    `sign-up
${email}
${alias}
${password1}`
  );
}

function handleSignUpResponse(rest) {
  const firstLine = rest[0];
  switch (firstLine) {
    case "err-uname-taken":
      showText(
        "err-sign-up-email",
        "This email is already registered. To sign in again, use the button below"
      );
      return navTo("sign-up");
    case "err":
      showText("err-sign-up-other", "Something went wrong");
      return navTo("sign-up");
    case "ok":
      handleSignInResponse(rest);
  }
}

function signIn() {
  const email = getValue("sign-in-email");
  const password = getValue("sign-in-password");

  if (/^(\w+)\@(\w+)\.(\w+)$/.test(email) == false) {
    showText("err-sign-in", "Please enter your e-mail address");
    //return;
  }
  hide("err-sign-in");

  navTo("loading");
  ws.send(
    `sign-in
${email}
${password}`
  );
}

function handleSignInResponse(rest) {
  const firstLine = rest[0];
  switch (firstLine) {
    case "err-no-user":
      showText(
        "err-sign-in",
        "This email is not registered. If you're new here, use the button below"
      );
      return navTo("sign-in");
    case "err-password":
      showText("err-sign-in", "Double-check your password");
      return navTo("sign-in");
    case "err":
      showText("err-sign-in", "Something went wrong");
      return navTo("sign-in");
    case "ok":
      showText("welcome-heading", `Hi, ${rest[1]}!`);
      return navTo("welcome");
  }
}

function handleSlideChange(rest) {
  const obj = JSON.parse(rest[0]);
  
  const {mainId, contents} = obj;
  navTo(mainId);
  Object.entries(contents).forEach(entry => {
    const [id, content] = entry;
    document.getElementById(id).innerHTML = content;
  })
}
