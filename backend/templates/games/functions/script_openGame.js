///////////////////////////////////////////
///                                     ///
///             ALL IMPORTS             ///
///                                     ///
///////////////////////////////////////////

import { games_list } from '../script_variables.js';
import { blackjack } from '../blackjack/script_game_blackjack.js';
import { closeMiniGame } from './script_closeGame.js';
import { getUserInfo } from './script_getUserInfo.js';
import { createButton } from './script_createDomElement.js';

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
export async function openMiniGame(game) {

  // GRAB THE CURRENT USERS DATA AND STORE IT
  const account = await getUserInfo();

  // IF ANY OF THESE ITEMS RETURNED UNDEFINED EXIT THE GAME
  if (!account.pictureLink || !account.username || account.serverCoins === null || undefined) {

    // CALL THE FAIL GAME LOAD
    failedGameLoad(game.title);
    return;
  }

  // store the current game being opened
  games_list.current_game = game;
  // the games popout wrapper
  const game_popout_wrapper = document.getElementById(games_list.game_popout_wrapper);

  // CREATE THE CLOSE BUTTON
  const closeBtn = createButton(false, true, 'X', null, games_list.game_popout_closebtn, () => closeMiniGame(game.title))
  game_popout_wrapper.append(closeBtn);

  // DISPLAY THE GAME POPOUT WRAPPER
  game_popout_wrapper.style.display = 'block';

  // BLACKJACK
  if (game.title === "Blackjack") {

    blackjack(game, account);

  }

}