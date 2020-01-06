import $ from 'jquery';
import compareNumbersTask from './compareNumbersTask';

describe('compareNumbersTask', () => {
  it('should add to dom compareNumbersTask with numbers', () => {
    compareNumbersTask.init();
    $('body').html(compareNumbersTask.templateQuestion());
    expect($('.expression span')).not.toBeNull();
  });
});
