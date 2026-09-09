///////////////////////////////////////////
///                                     ///
///             ALL IMPORTS             ///
///                                     ///
///////////////////////////////////////////

import { games_list } from '../script_variables.js';
import { preloadImages } from './script_imageArray.js'

///////////////////////////////////////////
///                                     ///
///        ALL LOCAL VARIABLES          ///
///                                     ///
///////////////////////////////////////////
const intro_variables = {

  // ANIMATION FRAME COUNT
  frameCount: 22,

  // HOW LONG UNTIL ANIMATION STARTS
  initialLoadHold: 1000,

  // HOW LONG TO HOLD THE LAST FRAME
  endHangTime: 5000,

  // END FADE OUT TIME
  endFadeTime: 1000,

  // ANIMATION SPEED
  animationSpeed: 150,

}

///////////////////////////////////////////
///                                     ///
///      THE GAME INTRO ANIMATION       ///
///                                     ///
///////////////////////////////////////////
// 
//  # GAME INTRO TO BE CALLED ON
//  # RUNS THE GAME INTRO ANIMATION AND 
//  # TAKES THE CURRENT GAME (GAME) INTO ACCOUNT
//
export async function gameIntro(title) {

  // CONSOLE LOG
  console.log('starting game intro | ' + title);

  // GRAB THE GAME WRAPPER
  const game_wrapper = document.getElementById(games_list.game_wrapper);

  // DECLARE VARIABLES
  let img;

  // SAVE IMAGES TO AN ARRAY
  const images = Array.from(
    { length: intro_variables.frameCount },
    (_, i) => `images/games/intro/intro_bcg_${i + 1}.png`
  );

  // LOAD ALL INTRO IMAGES TO THE USER
  await preloadImages(images, "intro", images.length);

  // CREATE IMAGE AND ASSIGN ITS TAGS
  img = document.createElement('img');
  img.style.width = '80%';
  img.style.height = 'auto';
  img.style.margin = 'auto auto';
  img.classList = 'game_intro_image';
  img.src = images[0];

  // APPEND IMAGE
  game_wrapper.append(img);

  // WAIT BEFORE STARTING
  await new Promise(resolve => {
    setTimeout(resolve, intro_variables.initialLoadHold);
  });

  // CHECK IF GAME STILL EXISTS
  if (!games_list.current_game) {
    img.remove();
    return;
  }

  // ANIMATE FRAMES
  for (let frame = 1; frame < images.length; frame++) {

    // CHECK IF GAME STILL EXISTS
    if (!games_list.current_game) {
      img.remove();
      return;
    }

    // SET THE IMAGES URL TO THE CURRENT FRAME NUMBER
    img.src = images[frame];

    await new Promise(resolve => {
      setTimeout(resolve, intro_variables.animationSpeed);
    });
  }

  // FADE OUT
  setTimeout(() => {
    img.classList.add('fadeOut');
  }, intro_variables.endHangTime - intro_variables.endFadeTime);

  // HOLD ON FINAL FRAME
  await new Promise(resolve => {
    setTimeout(resolve, intro_variables.endHangTime);
  });

  // REMOVE IMAGE
  img.remove();
}