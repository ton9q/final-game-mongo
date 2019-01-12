import $ from 'jquery';

import './task.css';
import template from './task.template';

class Task {
  static draw(taskName) {
    if (typeof taskName === 'undefined') {
      taskName = 'taskName';
    }

    $('.modal-body .in-task').append(template);
  }

  static clearInputAnswer() {
    $('input#answer').val('');
  }
}

export default Task;
