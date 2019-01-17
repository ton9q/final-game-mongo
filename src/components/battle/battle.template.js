export default `
<div class="wrapper">
  <div class="battle__panel">
    <div class="hero">
      <h3 class="hero-name" id="hero-name">HERO</h3>
      <div class="progress">
        <div class="hero-hp" id="hero-hp"></div>
      </div>
    </div>

    <div class="center-text">
      <h3 class="text-center" id="text-center">vs</h3>
    </div>

    <div class="monster">
      <h3 class="monster-name" id="monster-name">MONSTER</h3>
      <div class="progress">
        <div class="monster-hp" id="monster-hp"></div>
      </div>
    </div>
  </div>

  <div class="battle__game game-canvas-container" id="game-canvas-container">
    <canvas id="canvas-hero"></canvas>
    <canvas id="canvas-monster"></canvas>
  </div>

  <div class="battle__for-attack">
    <button type="button" class="button button-choice-spell" id="button-choice-spell">ATTACK</button>
  </div>
</div>
`;
