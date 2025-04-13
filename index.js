import { Project } from './project';
import { Task } from './task';
import { Storage } from './storage';
import { renderProject } from './dom';

const project = new Project('default');
const container = document.getElementById('task-list');
const form = document.getElementById('task-form');


const savedProjects = Storage.load();
if (savedProjects.length > 0) {
  Object.assign(project, savedProjects[0]);
}

renderProject(project, container);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = form.title.value;
  const desc = form.description.value;
  const date = form.dueDate.value;
  const priority = form.priority.value;
  const task = new Task(title, desc, date, priority);
  project.addTask(task);
  Storage.save([project]);
  renderProject(project, container);
  form.reset();
});

container.addEventListener('click', (e) => {
  const index = e.target.dataset.index;
  if (e.target.classList.contains('delete')) {
    project.deleteTask(index);
  } else if (e.target.classList.contains('complete')) {
    project.tasks[index].toggleComplete();
  }
  Storage.save([project]);
  renderProject(project, container);
});
