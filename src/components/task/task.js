import $ from 'jquery';

import './task.css';
import template from './task.template';

class Task {
  static draw() {
    $('.modal-body .in-task').append(template);
  }

  static clearInputAnswer() {
    $('input#answer').val('');
  }
}

export default Task;
