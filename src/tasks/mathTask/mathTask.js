class MathTask {
  constructor() {
    this.firstNumber = null;
    this.secondNumber = null;
    this.result = '';
    this.expression = '';

    this.operations = ['+', '-', '*', '/'];
  }

  init() {
    this.generateNumbers();
  }

  generateOperation() {
    const index = Math.floor(Math.random() * this.operations.length);
    return this.operations[index];
  }

  generateNumbers() {
    const operation = this.generateOperation();

    switch (operation) {
      case '+':
        this.firstNumber = Math.floor(Math.random() * 100);
        this.secondNumber = Math.floor(Math.random() * 100);
        this.result = this.firstNumber + this.secondNumber;
        break;
      case '-':
        this.secondNumber = Math.floor(Math.random() * 100);
        this.firstNumber = Math.floor(Math.random() * 100) + this.secondNumber;
        this.result = this.firstNumber - this.secondNumber;
        break;
      case '/':
        this.secondNumber = Math.floor(Math.random() * 10) + 1;
        this.firstNumber = this.secondNumber * (Math.floor(Math.random() * 10) + 1);
        this.result = this.firstNumber / this.secondNumber;
        break;
      case '*':
        this.firstNumber = Math.floor(Math.random() * 100) + 1;
        this.secondNumber = Math.floor(Math.random() * 10) + 1;
        this.result = this.firstNumber * this.secondNumber;
        break;
      default:
        break;
    }

    this.expression = `${this.firstNumber} ${operation} ${this.secondNumber}`;
  }

  templateQuestion() {
    const template = `
      <div class="expression">
        <span>${this.expression}</span>
      </div>
    `;

    return template;
  }
}

export default new MathTask();
