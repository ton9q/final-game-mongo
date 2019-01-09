import $ from 'jquery';

import './taskButton.css';

class TaskButton {
  static draw(taskName) {
    if (typeof taskName === 'undefined') {
      taskName = 'taskName';
    }

    const numberTaskButtons = $('.task-button').length;
    let template = `
    <button 
      type="button" 
      class="button task-button ${taskName}" 
      id="task-button-${numberTaskButtons}">
      ${taskName}
    </button>`;

    $('.modal-body').append(template);
  }
}

export default TaskButton;
