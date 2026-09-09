///////////////////////////////////////////
///                                     ///
///             ALL IMPORTS             ///
///                                     ///
///////////////////////////////////////////

import { games_list } from '../script_variables.js';
import { blackjack } from '../blackjack/script_game_blackjack.js';
import { closeMiniGame } from './script_closeGame.js';

///////////////////////////////////////////
///                                     ///
///        ALL LOCAL VARIABLES          ///
///                                     ///
///////////////////////////////////////////

///////////////////////////////////////////
///                                     ///
///    OPENS THE SELECTED MINI GAME     ///
///                                     ///
///////////////////////////////////////////
//
//
//
export function openMiniGame(game) {

  // store the current game being opened
  const currGame = game;
  games_list.current_game = game;
  // the games popout wrapper
  const game_popout_wrapper = document.getElementById(games_list.game_popout_wrapper);

  let closeBtn;

  closeBtn = document.createElement('button');
  closeBtn.id = games_list.game_popout_closebtn;
  closeBtn.textContent = 'X';
  game_popout_wrapper.append(closeBtn);

  //<button id="close_minigame_button" type="button">X</button>

  // display the wrapper
  game_popout_wrapper.style.display = 'block';

  closeBtn.addEventListener('click', () => {

    closeMiniGame(game.title);

  }, {once: true})


  console.log('Opening game | ' + game.title);


  if (currGame.title === "Blackjack") {

    blackjack(currGame);

  }

}