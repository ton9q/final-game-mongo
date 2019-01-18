import $ from 'jquery';
import capitals from '../../data/capitals';
import capitalsTask from './capitalsTask';

describe('capitalsTask', () => {
  it('should add to dom capitalsTask with capitals', () => {
    capitalsTask.init();
    $('body').html(capitalsTask.templateQuestion());
    expect(Object.keys(capitals)).toContain($('.expression span').text());
  });
});