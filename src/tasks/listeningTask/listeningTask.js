import $ from 'jquery';

import vocabulary from '../../data/vocabulary';

class ListeningTask {
  constructor() {
    this.synth = window.speechSynthesis;
    this.question;
    this.result;
  }

  init() {
    this.buttonCustom();

    const vocabularyArray = Object.keys(vocabulary);
    let question = vocabularyArray[Math.floor(Math.random() * vocabularyArray.length)];
    this.question = question;
    this.result = question;
  }

  speakQuestion() {
    const speech = new SpeechSynthesisUtterance(this.question);
    const voices = this.synth.getVoices();
    speech.voice = voices[4];
    this.synth.speak(speech);
  }

  buttonCustom() {
    const buttonHeard = $('button#heard-question');
    buttonHeard.click(() => this.speakQuestion());

    buttonHeard.css({
      'background-color': 'rgba(255, 255, 255, 0)',
      color: 'rgb(0, 0, 0)',
      outline: 'none',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease-in-out 0s',
    });

    buttonHeard.hover(
      function() {
        $(this).css({
          color: 'rgba(0, 0, 0, 0.4)',
        });
      },
      function() {
        $(this).css({
          color: 'rgb(0, 0, 0)',
        });
      }
    );
  }

  templateQuestion() {
    const template = `
      <div class="expression">
        <span>Please write what you heard </span>
        <button id="heard-question">
          <i class="fas fa-play-circle fa-2x"></i>
        </button>
      </div>
    `;

    return template;
  }
}

export default new ListeningTask();
