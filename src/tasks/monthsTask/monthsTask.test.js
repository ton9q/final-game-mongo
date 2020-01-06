import $ from 'jquery';
import months from '../../data/months';
import monthsTask from './monthsTask';

describe('monthsTask', () => {
  it('should add to dom monthsTask with months', () => {
    monthsTask.init();
    $('body').html(monthsTask.templateQuestion());
    expect(Object.keys(months)).toContain($('.expression span').text());
  });
});
