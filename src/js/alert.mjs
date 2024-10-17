// NS alerts module

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getAlert() {
  return fetch(`../json/alerts.json`)
    .then(convertToJson)
    .then((data) => data);
}

export async function publishAlert() {
  const alerts = await getAlert();
  console.log(alerts);
  // NS creates the section and adds the class name
  const section = document.createElement("section");
  section.className = "alert-list";

  // NS for each alert it will create a <p>, add style, and the message
  alerts.forEach((element) => {
    const para = document.createElement("p");
    para.style.color = element.color;
    para.style.backgroundColor = element.background;
    para.innerText = element.message;
    section.appendChild(para);
  });
  // NS adds alerts to top of page
  document.querySelector("main").prepend(section);
}
