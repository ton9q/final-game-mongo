/* eslint-disable no-param-reassign */
const tempCanvas = document.createElement('canvas');
const tctx = tempCanvas.getContext('2d');

function resizeTo(canvas, pct) {
  const cw = canvas.width;
  const ch = canvas.height;
  const ctx = canvas.getContext('2d');

  tempCanvas.width = cw;
  tempCanvas.height = ch;

  tctx.drawImage(canvas, 0, 0);

  canvas.width *= pct;
  canvas.height *= pct;

  ctx.drawImage(tempCanvas, 0, 0, cw, ch, 0, 0, cw * pct, ch * pct);
}

export default resizeTo;
