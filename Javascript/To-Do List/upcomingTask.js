import { format } from 'https://cdn.jsdelivr.net/npm/date-fns@2.29.3/esm/index.js';
import { projectList } from "./projectlist.js";
import { display } from "./taskDisplay.js";

function upcomingTasks() {

  const currentDate = format(new Date(), "yyyy-MM-dd");

  display.innerHTML = '';

  for (const project in projectList) {
    const tasks = projectList[project];
    tasks.forEach((task) => {
      if (!(task.date === currentDate)) {
        const taskCard = document.createElement("div");
        taskCard.className = "taskCard";
        taskCard.textContent = `${task.text} - Due: ${task.date} - Priority: ${task.priority}`;
        display.appendChild(taskCard);
      }
    });
  }
}

export { upcomingTasks };
