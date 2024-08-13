import { projects } from "./projects.js";
import { newTask } from "./addNewTask.js";
import { addNewTask } from "./taskPopup.js";
import { updateTodayTasks } from "./todayTask.js";
import {upcomingTasks} from "./upcomingTask.js"

const navBar = document.createElement("div");
navBar.className = "navBar";

addNewTask.appendChild(newTask);
navBar.appendChild(addNewTask);

const addTask = document.createElement("div");
addTask.className = "addTask";
addTask.addEventListener("click", () => {
  addNewTask.showModal();
});

const today = document.createElement("div");
today.className = "today";
today.addEventListener("click", ()=>{
  updateTodayTasks();
});

const upcoming = document.createElement("div");
upcoming.className = "upcoming";
upcoming.addEventListener("click", ()=>{
  upcomingTasks();
});

navBar.appendChild(addTask);
navBar.appendChild(today);
navBar.appendChild(upcoming);
navBar.appendChild(projects);

export { navBar };
