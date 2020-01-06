import capitals from '../../data/capitals.json';

class CapitalsTask {
  constructor() {
    this.question = '';
    this.result = '';
  }

  init() {
    this.generateQuestion();
  }

  generateQuestion() {
    const capitalsArray = Object.keys(capitals);
    const question = capitalsArray[Math.floor(Math.random() * capitalsArray.length)];
    this.question = question;
    this.result = capitals[question];
  }

  templateQuestion() {
    const template = `
      <div class="expression">
        <p>Please write capital of the next country (rus): "<span>${this.question}</span>"</p>
      </div>
    `;

    return template;
  }
}

export default new CapitalsTask();
