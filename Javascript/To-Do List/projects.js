import {currProjects} from "./addNewTask.js";

const projects = document.createElement("div");
projects.className = "projects";

const para = document.createElement("p");
para.textContent = "Projects";

projects.appendChild(para);


export {projects};