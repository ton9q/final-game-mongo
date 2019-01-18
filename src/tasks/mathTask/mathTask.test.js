import $ from 'jquery';
import mathTask from './mathTask';

describe('mathTask', () => {
  it('should add to dom mathTask with numbers', () => {
    mathTask.init();
    $('body').html(mathTask.templateQuestion());
    expect($('.expresion span')).not.toBeNull();
  });
});