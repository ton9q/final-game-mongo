import vocabulary from '../../data/vocabulary';

class TranslateTask {
  constructor() {
    this.question;
    this.result;
  }

  init() {
    this.generateQuestion();
  }

  generateQuestion() {
    const vocabularyArray = Object.keys(vocabulary);
    const question = vocabularyArray[Math.floor(Math.random() * vocabularyArray.length)];
    this.question = question;
    this.result = vocabulary[question];
  }
 
  templateQuestion() {
    const template = `
      <div class="expression">
        <p>Please translate: "<span>${this.question}</span>"</p>
      </div>
    `;

    return template;
  }
}

export default new TranslateTask();
