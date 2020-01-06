import flags from '../../data/flags';

class FlagsTask {
  constructor() {
    this.question = '';
    this.result = '';
  }

  init() {
    this.generateQuestion();
  }

  generateQuestion() {
    const flagsArray = Object.keys(flags);
    const flag = flagsArray[Math.floor(Math.random() * flagsArray.length)];
    this.question = flags[flag];
    this.result = flag;
  }

  templateQuestion() {
    const template = `
      <div class="expression">
        <p>Please write the name of the country shown below</p>
        <img class="flag" src=${this.question} style="width: 250px; height: 160px; border: 1px solid" alt="flag" />
      </div>
    `;

    return template;
  }
}

export default new FlagsTask();
