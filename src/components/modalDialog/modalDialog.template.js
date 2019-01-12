export default `
<div class="modal-dialog" id="modal-dialog">
  <div class="modal-body" id="modal-body">
    <div class="tasks"></div>
    <div class="in-task"></div>
    <div class="end-game">
      <div class="info-about-battle">
        <p>You killed monsters (series): <span class="number-monsters" id="number-monsters">0</span></p>
      </div>
      <button type="button" class="button end-button" id="end-button">Finish Game</button>
      <button type="button" class="button next-button" id="next-button">Next Monster</button>
    </div>
  </div>
</div>

<div class="modal-dialog-overlay" id="modal-dialog-overlay"></div>
`;
