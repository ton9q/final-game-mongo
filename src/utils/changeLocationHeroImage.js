const changeLocationHeroImage = (heroNumber, animationType) => {
  let width;
  let height;
  let canvasX = 0;
  let canvasY = 0;

  if (heroNumber === 0) {
    if (animationType === 'stand') {
      width = 400;
      height = 504;
      canvasX = 40;
      canvasY = 0;
    } else if (animationType === 'attack') {
      width = 903;
      height = 395;
      canvasX = 20;
      canvasY = 30;
    } else if (animationType === 'hurt') {
      width = 571;
      height = 482;
      canvasX = 0;
      canvasY = 8;
    } else if (animationType === 'die') {
      width = 695;
      height = 537;
      canvasX = 15;
      canvasY = 8;
    } else if (animationType === 'run') {
      width = 534;
      height = 565;
      canvasX = 20;
      canvasY = -16;
    } else if (animationType === 'jump') {
      width = 533;
      height = 523;
      canvasX = 20;
      canvasY = -7;
    }
  } else if (heroNumber === 1) {
    if (animationType === 'stand') {
      width = 496;
      height = 520;
      canvasX = 20;
      canvasY = 0;
    } else if (animationType === 'attack') {
      width = 643;
      height = 622;
      canvasX = 20;
      canvasY = -15;
    } else if (animationType === 'hurt') {
      width = 654;
      height = 503;
      canvasX = 0;
      canvasY = 8;
    } else if (animationType === 'die') {
      width = 682;
      height = 552;
      canvasX = -5;
      canvasY = 0;
    } else if (animationType === 'run') {
      width = 582;
      height = 587;
      canvasX = 20;
      canvasY = -20;
    } else if (animationType === 'jump') {
      width = 620;
      height = 527;
      canvasX = 0;
      canvasY = -5;
    }
  } else if (heroNumber === 2) {
    if (animationType === 'stand') {
      width = 428;
      height = 380;
      canvasX = 40;
      canvasY = 32;
    } else if (animationType === 'attack') {
      width = 540;
      height = 456;
      canvasX = 40;
      canvasY = 27;
    } else if (animationType === 'hurt') {
      width = 543;
      height = 413;
      canvasX = 15;
      canvasY = 30;
    } else if (animationType === 'die') {
      width = 634;
      height = 464;
      canvasX = 5;
      canvasY = 27;
    } else if (animationType === 'run') {
      width = 468;
      height = 428;
      canvasX = 40;
      canvasY = 22;
    } else if (animationType === 'jump') {
      width = 480;
      height = 420;
      canvasX = 40;
      canvasY = 22;
    }

    canvasY += 100;
  }
  return {
    width, height, canvasX, canvasY,
  };
};

export default changeLocationHeroImage;
