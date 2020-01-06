import months from '../../data/months.json';

class MonthsTask {
  constructor() {
    this.question = '';
    this.result = '';
  }

  init() {
    this.generateQuestion();
  }

  generateQuestion() {
    const monthsArray = Object.keys(months);
    const question = monthsArray[Math.floor(Math.random() * monthsArray.length)];
    this.question = question;
    this.result = months[question];
  }

  templateQuestion() {
    const template = `
      <div class="expression">
        <p>How many days in this month: "<span>${this.question}</span>"</p>
      </div>
    `;

    return template;
  }
}

export default new MonthsTask();
