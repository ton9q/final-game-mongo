import $ from 'jquery';
import vocabulary from '../../data/vocabulary';
import listeningTask from './listeningTask';

describe('listeningTask', () => {
  it('should add to dom listeningTask with vocabulary', () => {
    listeningTask.init();
    $('body').html(listeningTask.templateQuestion());
    expect(Object.keys(vocabulary)).toContain(listeningTask.result);
  });
});