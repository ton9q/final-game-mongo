import $ from 'jquery';
import vocabulary from '../../data/vocabulary';
import translateTask from './translateTask';

describe('translateTask', () => {
  it('should add to dom translateTask with vocabulary', () => {
    translateTask.init();
    $('body').html(translateTask.templateQuestion());
    expect(Object.keys(vocabulary)).toContain($('.expression span').text());
  });
});