import $ from 'jquery';
import flagsTask from './flagsTask';

describe('flagsTask', () => {
  it('should add to dom flagsTask with flags', () => {
    flagsTask.init();
    $('body').html(flagsTask.templateQuestion());
    expect($('.expresion img').attr('src')).not.toBeNull();
  });
});
