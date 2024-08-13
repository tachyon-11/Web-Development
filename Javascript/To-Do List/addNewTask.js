import { task } from "./task.js";
import { addNewTask } from "./taskPopup.js";
import { display } from "./taskDisplay.js";
import { projectList, currProjects } from "./projectlist.js";
import { projects } from "./projects.js";

projectList["My tasks"] = [];

const newTask = document.createElement("form");

const taskTextLabel = document.createElement("label");
taskTextLabel.textContent = "Task:";
taskTextLabel.setAttribute("for", "task-text");

const taskTextInput = document.createElement("input");
taskTextInput.type = "text";
taskTextInput.name = "task-text";
taskTextInput.id = "task-text";
taskTextInput.required = true;

const dueDateLabel = document.createElement("label");
dueDateLabel.textContent = "Due Date:";
dueDateLabel.setAttribute("for", "due-date");

const dueDateInput = document.createElement("input");
dueDateInput.type = "date";
dueDateInput.name = "due-date";
dueDateInput.id = "due-date";
dueDateInput.required = true;

const priorityLabel = document.createElement("label");
priorityLabel.textContent = "Priority:";
priorityLabel.setAttribute("for", "priority");

const prioritySelect = document.createElement("select");
prioritySelect.name = "priority";
prioritySelect.id = "priority";
prioritySelect.required = true;

const priorities = ["low", "medium", "high", "urgent"];
priorities.forEach((priority) => {
  const option = document.createElement("option");
  option.textContent = priority;
  option.value = priority;
  prioritySelect.appendChild(option);
});

const projectLabel = document.createElement("label");
projectLabel.textContent = "Add to Project:";
projectLabel.setAttribute("for", "project");

const projectSelect = document.createElement("select");
projectSelect.name = "project";
projectSelect.id = "project";
projectSelect.required = true;

currProjects.forEach((project) => {
  const option = document.createElement("option");
  option.textContent = project;
  option.value = project;
  projectSelect.appendChild(option);
});

const addNewProjectOption = document.createElement("option");
addNewProjectOption.textContent = "Add new project...";
addNewProjectOption.value = "new-project";
projectSelect.appendChild(addNewProjectOption);

projectSelect.addEventListener("change", () => {
  if (projectSelect.value === "new-project") {
    const newProjectName = prompt("Enter new project name:");
    if (newProjectName && !(currProjects.has(newProjectName))) {
      currProjects.add(newProjectName);
      projectList[newProjectName] = [];
      const newOption = document.createElement("option");
      newOption.textContent = newProjectName;
      newOption.value = newProjectName;
      projectSelect.insertBefore(newOption, addNewProjectOption);
      projectSelect.value = newProjectName;
    } else {
      projectSelect.value = newProjectName;
    }
  }
});

const submitButton = document.createElement("button");
submitButton.textContent = "Add Task";
submitButton.type = "submit";
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const text = taskTextInput.value;
  const date = dueDateInput.value;
  const priority = prioritySelect.value;
  const projectName = projectSelect.value;
  const newTaskInstance = new task(text, date, priority, projectName);
  projectList[projectName].push(newTaskInstance);
  addTaskToDisplay(newTaskInstance);
  updateProjects()
  console.log(projectList);

  taskTextInput.value = "";
  dueDateInput.value = "";
  prioritySelect.value = "low";
  projectSelect.value = "My tasks";

  addNewTask.close();
});

function addTaskToDisplay(taskInstance) {
  const taskCard = document.createElement("div");
  taskCard.className = "taskCard";
  taskCard.textContent = `${taskInstance.text} - Due: ${taskInstance.date} - Priority: ${taskInstance.priority} - Project: ${taskInstance.project}`;
  display.appendChild(taskCard);
}

function updateProjects() {
  const lists = document.createElement("li");
  if(projects.hasChildNodes())
  projects.replaceChildren();
  for (let item of currProjects) {
    let listItem = document.createElement("ul");
    listItem.textContent = item;
    lists.appendChild(listItem);
  }
  projects.appendChild(lists);
}

newTask.appendChild(taskTextLabel);
newTask.appendChild(taskTextInput);
newTask.appendChild(dueDateLabel);
newTask.appendChild(dueDateInput);
newTask.appendChild(priorityLabel);
newTask.appendChild(prioritySelect);
newTask.appendChild(projectLabel);
newTask.appendChild(projectSelect);
newTask.appendChild(submitButton);

addNewTask.appendChild(newTask);
display.appendChild(addNewTask);

export { newTask, currProjects };
