export default `
<div class="wrapper">
  <section class="config__header">
    <h2>Create your person</h2>
  </section>

  <section class="config__name">
    <label for="person-name">Enter your name</label>
    <input type="text" id="person-name" placeholder="Your name"> 
  </section>

  <section class="config__battle-info">
    <article class="view-info">
      <div class="background-container" id="background-container">
      </div>
      <div class="person-container" id="person-container">
      </div>
    </article>

    <article class="choose-info">
      <div class="backgrounds">
        <h3>Select background</h3>
        <div class="wrapper-container" id="background-wrapper-container">
        </div>
      </div>

      <div class="persons">
        <h3>Select person</h3>
        <div class="wrapper-container" id="person-wrapper-container">
        </div>
      </div>
    </article>
  </section>

  <section class="config__start">
    <button class="button start-button">
      Start Game!
    </button>
  </section>
</div>
`;
