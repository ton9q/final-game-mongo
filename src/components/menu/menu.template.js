export default `
<div class="wrapper">
  <section class="menu__container" id="menu__container">
    <div class="menu__item new-game" id="new-game">New Game</div>
    <div class="menu__item score" id="score">Score</div>
    <div class="menu__item help" id="help">Help</div>
  </section>
  
  <article class="menu__section menu__score_section" id="menu__score_section">
    <h2>Top results</h2>
    <div class="menu__score_container" id="menu__score_container">RESULTS</div>
    <button class="button close-button">
      <i class="fas fa-chevron-left"></i>
      Close
    </button>
  </article>

  <article class="menu__section menu__help_section" id="menu__help_section">
    <p>
      My text help for playing the game
    </p>
    <button class="button close-button">
      <i class="fas fa-chevron-left"></i>
      Close
    </button>
  </article>
</div>
`;
