import $ from 'jquery';

import './taskButton.css';

import { spaceToDashInString } from '../../utils/index';

class TaskButton {
  static draw(taskName) {
    const numberTaskButtons = $('.task-button').length;

    const template = `
    <button 
      type="button" 
      class="button task-button ${spaceToDashInString(taskName)}" 
      id="task-button-${numberTaskButtons}">
      ${taskName || 'taskName'}
    </button>`;

    $('.modal-body .tasks').append(template);
  }
}

export default TaskButton;
