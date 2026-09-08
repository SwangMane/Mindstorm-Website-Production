/////////////////////////////////////////////////
///                                           ///
///           BLACKJACK GAME SCRIPT           ///
///                                           ///
/////////////////////////////////////////////////

// ALL IMPORTS 

import { closeMiniGame, gameIntro, loadGamesAccount, games_list } from './script_minigames.js';

//-----------------------------------------------------------------//

// all blackjack variables
const variables = {

  // THE GAME WRAPPER
  game_wrapper: 'game_wrapper',

  // ALL MENU ELEMENTS
  menus: {

    // MAIN MENU STUFF
    mainMenu: {

      // WRAPPER FOR PLAYER STATS
      player_wrap: 'player_wrapper',

      // WRAPPER FOR THE GAME OPTIONS
      option_wrap: 'option_wrapper',


    }

  },

  // all buttons 
  buttons: {

    // button to close the game
    close_game: 'close_minigame_button',

  },

}

// LOADS THE BLACKJACK GAME
export async function loadBlackjack(game) {

  // GRAB THE CURRENT USERS DATA AND STORE IT
  const [pictureLink, username, serverCoins] = await loadGamesAccount();

  // CURRENT USERS DATA
  const account_picture = pictureLink;
  const current_user = username;
  const current_coins = serverCoins;

  // IF ANY OF THESE ITEMS RETURNED UNDEFINED EXIT THE GAME
  if (!account_picture || !current_user || current_coins === null) {

    // CALL THE FAIL GAME LOAD
    failedGameLoad(game.title);
    return;
  }

  // LOG THE USERS INFO
  console.log('Account fetch for user ' + current_user + ' successful | ' + game.title);

  // START THE GAME INTRO
  await gameIntro(game.title);

  if (!games_list.current_game) return;

  console.log('starting game | ' + game.title);

  // log the current game being played
  const currGame = game;

  // INITIAL MAIN MENU LOAD
  mainMenu();

}

///////////////////////////////////////////
///                                     ///
///     BLACKJACK MAIN MENU FUNCTION    ///
///                                     ///
///////////////////////////////////////////
async function mainMenu() {

  const [pictureLink, username, serverCoins] = await loadGamesAccount();

  // STORE THE GAME WRAPPER
  const game_wrapper = document.getElementById(variables.game_wrapper);

  // CLEAR THE WRAPPER
  game_wrapper.innerHTML = '';

  // USER WRAP VARIABLES
  let user_wrap;
  let user_name;
  let user_image;
  let user_coins;

  // USERNAME TEXT
  user_name = document.createElement('p');
  user_name.textContent = username;

  // USER ICON IMAGE
  user_image = document.createElement('img');
  user_image.src = pictureLink;

  // USER COINS
  user_coins = document.createElement('p');
  user_coins.textContent = 'Server Coins: ' + serverCoins;

  // USER WRAPPER
  user_wrap = document.createElement('div');
  user_wrap.classList = variables.menus.mainMenu.player_wrap;
  user_wrap.append(user_name, user_coins, user_image);

  // MENU OPTIONS VARIABLES
  let option_wrap;
  let deal_hand;
  let move_check;
  let move_split;
  let bet_amt;
  let bet_up;
  let bet_down;


  option_wrap = document.createElement('div');
  option_wrap.classList = variables.menus.mainMenu.option_wrap;



  // APPEND ALL ELEMENTS
  game_wrapper.append(user_wrap, option_wrap);




};

function createButton(name, fnct, enabled=false) {
  
}


