///////////////////////////////////////////
///                                     ///
///             ALL IMPORTS             ///
///                                     ///
///////////////////////////////////////////

import { games_list } from '../script_variables.js';
import { gameIntro } from '../functions/script_intro.js';
import { preloadImages } from '../functions/script_imageArray.js';
import { createButton, createImage, createInput } from '../functions/script_createDomElement.js';
import { hideShowDomObj } from '../functions/script_hideShowDomElement.js';
import { randNum } from '../functions/script_randomNumber.js';

///////////////////////////////////////////
///                                     ///
///        ALL LOCAL VARIABLES          ///
///                                     ///
///////////////////////////////////////////

const variables = {

  // TO SKIP THE INTRO 
  intro_skip: true,

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

    },
    // THE WRAPPER TO THE CARDS
    cardWrap: 'card_wrapper',
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

    // DOUBLE DOWN BUTTON
    move_dbl_down: 'move_dbl_down_btn',

    // BET UP BUTTON
    bet_up: 'bet_up_btn',

    // BET DOWN BUTTON
    bet_down: 'bet_down_btn',

    // ALL THE ACTION BUTTONS
    action_buttons: 'action_buttons',

  },
  inputs: {

    // BET AMOUNT
    bet_amount: 'bet_amount_input',

  }

}

// STORE THE CURRENT ACCOUNT
let currAccount;

// STORE THE GAME WRAPPER
const game_wrapper = document.getElementById(variables.game_wrapper);

// USER WRAP VARIABLES
let user_wrap;
let user_name;
let user_image;
let user_coins;

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

// STORE GAME CHAR VARIABLES
let player_cards;
let dealer_cards;
let dealer_card_wrap;
let player_card_wrap;
let card_wrap;

// GAME CARD VARIABLES (2 DECKS OF 52 CARDS = 104)
let card_count = {
  1: 8,
  2: 8,
  3: 8,
  4: 8,
  5: 8,
  6: 8,
  7: 8,
  8: 8,
  9: 8,
  10: 8,
  11: 8,
  12: 8,
  13: 8,
};

/////////////////////////////////////////////////
///                                           ///
///           BLACKJACK GAME SCRIPT           ///
///                                           ///
/////////////////////////////////////////////////
export async function blackjack(game, account) {

  // SET THE ACCOUNT;
  currAccount = account

  // START THE GAME INTRO
  await gameIntro(game.title, variables.intro_skip);

  // IF THE USER LEAVES BEFORE INTO IS DONE
  if (!games_list.current_game) return;

  //cards = cards.map(item => `images/games/blackjack/${item}`);

  //preloadImages(cards, "Playing cards", cards.length);

  // INITIAL MAIN MENU LOAD
  mainMenu(account);

}

///////////////////////////////////////////
///                                     ///
///     BLACKJACK MAIN MENU FUNCTION    ///
///                                     ///
///////////////////////////////////////////
async function mainMenu(account) {

  // CLEAR THE WRAPPER
  game_wrapper.innerHTML = '';

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

  // CREATE THE START WRAP
  start_wrap = document.createElement('div');
  start_wrap.classList = variables.menus.mainMenu.start_wrap;
  // THE START MOVES
  bet_amt = createInput(false, true, 'number', 'numeric', 'Enter bet amount', 0, null, variables.inputs.bet_amount.value, null);
  bet_down = createButton(false, true, 'Decrease Bet', variables.buttons.action_buttons, variables.buttons.bet_down, () => initialBet(bet_down, bet_amt, account));
  bet_up = createButton(false, true, 'Increase Bet', variables.buttons.action_buttons, variables.buttons.bet_up, () => initialBet(bet_up, bet_amt, account));
  // APPEND ALL ITEMS TO THE START WRAPPER
  start_wrap.append(bet_down, bet_amt, bet_up);

  // CREATE THE MOVE WRAP
  move_wrap = document.createElement('div');
  move_wrap.classList = variables.menus.mainMenu.move_wrap;
  // THE ALTERNATE MOVE BUTTONS
  deal_hand = createButton(false, true, 'Deal Hand', variables.buttons.action_buttons, variables.buttons.deal_hand, () => dealHand(bet_amt.value, account));
  move_hit = createButton(true, false, 'Hit',  variables.buttons.action_buttons, variables.buttons.move_hit, false);
  move_split = createButton(true, false, 'Split Hand', variables.buttons.action_buttons, variables.buttons.move_split, false);
  move_dbl_down = createButton(true, false, 'Double Down', variables.buttons.action_buttons, variables.buttons.move_dbl_down, false);
  // APPEND THE BUTTONS TO THE WRAPPER
  move_wrap.append(deal_hand, move_hit, move_split, move_dbl_down);

  // CREATE THE CARD WRAPPER
  card_wrap = document.createElement('div');
  card_wrap.classList = variables.menus.cardWrap;
  card_wrap.style.display = 'none';
  // CREATE THE INNER CARD WRAPS
  dealer_card_wrap = document.createElement('div');
  player_card_wrap = document.createElement('div');
  // APPEND THE INNER WRAPS TO THE OUTTER
  card_wrap.append(dealer_card_wrap, player_card_wrap);

  // APPEND ALL ELEMENTS
  game_wrapper.append(user_wrap, start_wrap, move_wrap, card_wrap);

};

///////////////////////////////////////////
///                                     ///
///      BLACKJACK BET AMT BUTTONS      ///
///                                     ///
///////////////////////////////////////////
function initialBet(button, input, account) {

  console.log(button.id + ' was hit');

  // THE BET DOWN BUTTON
  if (button.id === variables.buttons.bet_down) {

    if (!input || input.value <= 0) return;
    else input.value--;

  }
  // THE BET UP BUTTON
  if (button.id === variables.buttons.bet_up) {

    if (!input) return;

    const currBet = Number(input.value) || 0;

    if (currBet >= account.serverCoins) return;

    input.value = currBet + 1;
  }
}

///////////////////////////////////////////
///                                     ///
///    BLACKJACK DEAL HAND FUNCTION     ///
///                                     ///
///////////////////////////////////////////
async function dealHand(bet_amt, account) {

  // KEEP USERNAME HERE
  const userName = account.username;

  //
  //
  //  TAKE THE USERS COINS BEFORE DEALING HAND
  //
  //
    try {
      const response = await fetch("http://localhost:5000/api/take-user-coins", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_name: userName,
          coin_amount: bet_amt
        })
      });

      // Parse the server response FIRST
      const data = await response.json();

      // Handle server errors
      if (!response.ok) {
        console.log("FULL SERVER RESPONSE:", data);

        throw new Error(
          data?.error ||
          data?.message ||
          "Failed to take coins"
        );
      }

      // Successful response
      console.log("Take coins response:", data);
      user_coins.textContent = 'Server Coins: ' + data.server_points;
      deal();

    } catch (error) {

      console.error("Take coins error:", error);

    }


    function deal() {

      // HIDE THE START WRAPPER
      hideShowDomObj(true, null, null, variables.menus.mainMenu.start_wrap);

      // HIDE THE DEAL HAND BTN
      hideShowDomObj(true, null, variables.buttons.deal_hand, null);

      // SHOW THE USER FUNCTIONS
      hideShowDomObj(null, true, move_hit.id, null);
      hideShowDomObj(null, true, move_split.id, null);
      hideShowDomObj(null, true, move_dbl_down.id, null);

      hideShowDomObj(null, true, null, card_wrap.classList, 'flex');

      const card1 = Number(randNum(1, 13));
      let player_card_1 = genCard(card1);
      player_card_1 = createImage(player_card_1, null, null);

      player_card_wrap.append(player_card_1);

      const card2 = Number(randNum(1, 13));
      let player_card_2 = genCard(card2);
      player_card_2 = createImage(player_card_2, null, null);

      player_card_wrap.append(player_card_2);

      setTimeout(() => {

        game_wrapper.innerHTML = '';

        mainMenu(account);

      }, 3000);
      
      

      console.log(player_card_1);


    }

  function genCard(cardNumber) {

    const prepend = 'images/games/blackjack/';
    let card;

    if (cardNumber <= 10) {
     card = `${cardNumber}.gif`;
    }

    if (cardNumber === 11) card = '10JACK.gif';
    if (cardNumber === 12) card = '10QUEEN.gif';
    if (cardNumber === 13) card = '10KING.gif';

    card = prepend + card;

    return card;
  }

}



