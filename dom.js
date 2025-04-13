import { format } from 'date-fns';

export function renderProject(project, container) {
  container.innerHTML = '';
  project.getTasks().forEach((task, index) => {
    const item = document.createElement('div');
    item.className = 'task-item';
    item.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>期限：${format(new Date(task.dueDate), 'yyyy/MM/dd (EEE)')}</p>
      <p>優先級別：${task.priority}</p>
      <button data-index="${index}" class="complete">${task.completed ? '已完成' : '未完成'}</button>
      <button data-index="${index}" class="delete">刪除</button>
    `;
    container.appendChild(item);
  });
}
