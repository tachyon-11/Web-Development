import { navBar } from "./nav.js";
import { display } from "./taskDisplay.js";

const mainPage = document.querySelector(".main");
const mainHeading = document.createElement("div");
mainHeading.className = "mainHeading";
const mainBody = document.createElement("div");
mainBody.className = "mainBody";

mainBody.appendChild(navBar);
mainBody.appendChild(display);
mainPage.appendChild(mainHeading);
mainPage.appendChild(mainBody);

export {mainPage, mainBody, mainHeading};
