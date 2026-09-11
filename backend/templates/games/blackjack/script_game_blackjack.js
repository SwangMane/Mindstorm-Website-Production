///////////////////////////////////////////
///                                     ///
///             ALL IMPORTS             ///
///                                     ///
///////////////////////////////////////////

import { games_list } from '../script_variables.js';
import { gameIntro } from '../functions/script_intro.js';
import { getUserInfo } from '../functions/script_getUserInfo.js';
import { preloadImages } from '../functions/script_imageArray.js';
import { createButton, createInput } from '../functions/script_createDomElement.js';

///////////////////////////////////////////
///                                     ///
///        ALL LOCAL VARIABLES          ///
///                                     ///
///////////////////////////////////////////

const variables = {

  // THE GAME WRAPPER
  game_wrapper: 'game_wrapper',

  // ALL MENU ELEMENTS
  menus: {

    // MAIN MENU STUFF
    mainMenu: {

      // WRAPPER FOR PLAYER STATS
      player_wrap: 'player_wrapper',

      // WRAPPER FOR THE STARTING STUFF
      start_wrap: 'start_wrapper',

      // WRAPPER FOR THE GAME OPTIONS
      move_wrap: 'move_wrapper',

    }

  },
  // ALL BUTTONS 
  buttons: {

    // button to close the game
    close_game: 'close_minigame_button',

    // THE DEAL HAND / START GAME BUTTON
    deal_hand: 'deal_hand_btn',
    
    // THE HIT BUTTON
    move_hit: 'move_hit_btn',

    // THE SPLIT BUTTON
    move_split: 'move_split_btn',

    move_dbl_down: 'move_dbl_down_btn',

    // ALL THE ACTION BUTTONS
    action_buttons: 'action_buttons',

  },

}

/////////////////////////////////////////////////
///                                           ///
///           BLACKJACK GAME SCRIPT           ///
///                                           ///
/////////////////////////////////////////////////
export async function blackjack(game, account) {

  // START THE GAME INTRO
  await gameIntro(game.title);

  // IF THE USER LEAVES BEFORE INTO IS DONE
  if (!games_list.current_game) return;

  // LOAD THE GAME IMAGES INTO LOCAL STORAGE
  let cards = [
    "1OR11.gif", "2.gif", "3.gif", "4.gif", "5.gif", "6.gif", "7.gif", "8.gif", "9.gif", "10.gif", "10JACK.gif", "10QUEEN.gif", "10KING.gif"
  ]

  cards = cards.map(item => `images/games/blackjack/${item}`);

  preloadImages(cards, "Playing cards", cards.length);

  // INITIAL MAIN MENU LOAD
  mainMenu(account, cards);

}

///////////////////////////////////////////
///                                     ///
///     BLACKJACK MAIN MENU FUNCTION    ///
///                                     ///
///////////////////////////////////////////
async function mainMenu(account, images) {

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
  user_name.textContent = account.username;

  // USER ICON IMAGE
  user_image = document.createElement('img');
  user_image.src = account.pictureLink;

  // USER COINS
  user_coins = document.createElement('p');
  user_coins.textContent = 'Server Coins: ' + account.serverCoins;

  // USER WRAPPER
  user_wrap = document.createElement('div');
  user_wrap.classList = variables.menus.mainMenu.player_wrap;
  user_wrap.append(user_name, user_coins, user_image);

  // MENU OPTIONS VARIABLES
  let start_wrap;
  let move_wrap;
  let deal_hand;
  let move_hit;
  let move_split;
  let move_dbl_down;
  let bet_amt;
  let bet_up;
  let bet_down;

  // CREATE THE START WRAP
  start_wrap = document.createElement('div');
  start_wrap.classList = variables.menus.mainMenu.start_wrap;

  // THE DEAL HAND BUTTON
  deal_hand = createButton(false, true, 'Deal Hand', variables.buttons.action_buttons, variables.buttons.deal_hand, false);
  bet_amt = createInput(false, true, 'number', 'Enter bet amount', null, null, null);

  start_wrap.append(deal_hand, bet_amt);

  // CREATE THE MOVE WRAP
  move_wrap = document.createElement('div');
  move_wrap.classList = variables.menus.mainMenu.move_wrap;

  // THE ALTERNATE MOVE BUTTONS
  move_hit = createButton(false, false, 'Hit',  variables.buttons.action_buttons, variables.buttons.move_hit, false);
  move_split = createButton(true, false, 'Split Hand', variables.buttons.action_buttons, variables.buttons.move_split, false);
  move_dbl_down = createButton(true, false, 'Double Down', variables.buttons.action_buttons, variables.buttons.move_dbl_down, false);

  // APPEND THE BUTTONS TO THE WRAPPER
  move_wrap.append(deal_hand, move_hit, move_split, move_dbl_down);

  // APPEND ALL ELEMENTS
  game_wrapper.append(user_wrap, start_wrap, move_wrap);




};


