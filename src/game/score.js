class Score {
  static scoreItem(name, score) {
    const scoreItemTemplate = `
    <div class="score-item">
      <div class="name">${name}</div>
      <div class="score-in-game">${score}</div>
    </div>
    `;

    return scoreItemTemplate;
  }

  static domArrayToArray(domArray) {
    const newArray = [];
    for (let i = 0; i < domArray.length; i++) {
      newArray.push(domArray[i].innerHTML);
    }

    return newArray;
  }

  static addToScore(name, score) {
    const names = Score.domArrayToArray($('.menu__score_container .name'));
    const scores = Score.domArrayToArray($('.menu__score_container .score-in-game'));

    if (names.indexOf(name) === -1) {
      const template = Score.scoreItem(name, score);
      let position = 0;

      let elementAdd = false;

      for (let i = 0; i < scores.length; i++) {
        if (score > Number(scores[i])) {
          position = i;
          elementAdd = true;
          break;
        }
      }

      if (!elementAdd) {
        $(`.menu__score_container`).append(template);
      } else {
        $(`.menu__score_container .score-item:eq(${position})`).before(template);
      }
    } else {
      const indexItem = names.indexOf(name);
      const scoreNow = Number(scores[indexItem]);
      $(`.menu__score_container .score-item:eq(${indexItem})`).remove();
      Score.addToScore(name, scoreNow + score);
    }
  }
}

export default Score;
