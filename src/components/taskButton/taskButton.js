import $ from 'jquery';

import './taskButton.css';

import { spaceToDashInString } from '../../utils/index';

class TaskButton {
  static draw(taskName) {
    if (typeof taskName === 'undefined') {
      taskName = 'taskName';
    }

    const numberTaskButtons = $('.task-button').length;

    let template = `
    <button 
      type="button" 
      class="button task-button ${spaceToDashInString(taskName)}" 
      id="task-button-${numberTaskButtons}">
      ${taskName}
    </button>`;

    $('.modal-body .tasks').append(template);
  }
}

export default TaskButton;
