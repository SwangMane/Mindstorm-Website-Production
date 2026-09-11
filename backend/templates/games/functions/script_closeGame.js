///////////////////////////////////////////
///                                     ///
///             ALL IMPORTS             ///
///                                     ///
///////////////////////////////////////////

import { games_list } from '../script_variables.js';

///////////////////////////////////////////
///                                     ///
///        ALL LOCAL VARIABLES          ///
///                                     ///
///////////////////////////////////////////

///////////////////////////////////////////
///                                     ///
///      CLOSE THE CURR MINI GAME       ///
///                                     ///
/////////////////////////////////////////// 
//
//  # CLOSES THE CURRENT MINIGAME
//
export function closeMiniGame(title) {

  // DE-SET THE CURRENT GAME
  games_list.current_game = null;

  // MINI GAME WRAPPER;
  const game_popout_wrapper = document.getElementById(games_list.game_popout_wrapper);
  const game_wrapper = document.getElementById(games_list.game_wrapper);
  const close_game_btn = document.getElementById('close_minigame_button');

  // REMOVE THE BUTTON FROM THE PAGE
  close_game_btn.remove();

  // CLEAR THE GAME WRAPPER FOR NEXT USE
  game_wrapper.innerHTML = '';

  // HIDE THE MINI GAME WRAPPER
  game_popout_wrapper.style.display = 'none';

}