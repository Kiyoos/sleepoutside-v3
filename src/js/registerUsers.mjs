import { registerUser } from "./externalServices.mjs";
import { alertMessage, removeAllAlerts } from "./utils.mjs";

export function registerEvents() {
  if (window.location.pathname.includes("registered")) {
    return;
  }
  document.forms["register"].addEventListener("submit", (e) => {
    e.preventDefault();
    userInfo(e.target);
  });
}

export function registeredEvents() {
  if (!window.location.pathname.includes("registered")) {
    return;
  }
  document.getElementById("checkout").addEventListener("click", () => {
    window.location.href = "/checkout/index.html";
  });

  document.getElementById("continue").addEventListener("click", () => {
    window.location.href = "/";
  });
}

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export async function userInfo(form) {
  const json = formDataToJSON(form);
  try {
    const res = await registerUser(json);
    console.log(res);
    window.location = "/users/registered.html";
  } catch (err) {
    removeAllAlerts();
    for (let message in err.message) {
      alertMessage(err.message[message]);
    }
  }
}
