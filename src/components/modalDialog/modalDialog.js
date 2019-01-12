import $ from 'jquery';

import template from './modalDialog.template';
import './modalDialog.css';

class ModalDialog {
  static draw() {
    $('body').append(template);

    $('.modal-body .in-task').hide();
    $('.modal-body .end-game').hide();

    const size = 400;

    $('#modal-dialog').css({
      'height': `${size}px`,
      'width': `${size*1.5}px`,
      'margin-top': `${-(size/2)}px`,
      'margin-left': `${-(size*1.5/2 + parseInt($('#modal-dialog').css('padding'), 10))}px`
    });

    $('#modal-dialog-overlay').click(function() {
      ModalDialog.close()
    });
  }

  static open() {
    $('#modal-dialog-overlay').fadeIn(400, function() {
      $('#modal-dialog')
        .css('display', 'block')
        .animate({ opacity: 1, top: '50%' }, 200);
    });
  }

  static close() {
    $('#modal-dialog').animate({ opacity: 0, top: '45%' }, function() {
      $(this).css('display', 'none');
      $('#modal-dialog-overlay').fadeOut(400);
    });
  }
}

export default ModalDialog;
