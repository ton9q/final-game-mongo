class CompareNumbersTask {
  constructor() {
    this.question;
    this.result;
  }

  init() {
    this.generateQuestion();
  }

  generateQuestion() {
    const firstNumber = Math.floor(Math.random() * 100);
    const secondNumber = Math.floor(Math.random() * 100);

    this.question = `'${firstNumber}' and '${secondNumber}'`;

    if (firstNumber === secondNumber) this.result = '=';
    else if (firstNumber > secondNumber) this.result = '>';
    else this.result = '<';
  }

  templateQuestion() {
    const template = `
      <div class="expression">
        <p>Compare the numbers and enter required comparision operator:<br>
          <span>${this.question}</span>
        </p>
      </div>
    `;

    return template;
  }
}

export default new CompareNumbersTask();
