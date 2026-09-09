///////////////////////////////////////////
///                                     ///
///             ALL IMPORTS             ///
///                                     ///
///////////////////////////////////////////

import { siteVariables } from './script_variables.js';
import { games_list } from './games/script_variables.js';
import { openMiniGame } from './games/functions/script_openGame.js';

///////////////////////////////////////////
///                                     ///
///        ALL LOCAL VARIABLES          ///
///                                     ///
///////////////////////////////////////////

let initialized = false;

fillMinigames();

///////////////////////////////////////////
///                                     ///
///      FILL THE MINI GAME LIST        ///
///                                     ///
///////////////////////////////////////////
async function fillMinigames() {

  // CHECK IF THIS HAS ALREADY RAN
  if (initialized) return;
  initialized = true;

  // DECLARE ALL VARIABLES 
  let logged_in;
  let login_required;
  let mobile_detected;
  let window_width;
  let list_wrap;
  let game_locked;

  // SET VARIABLES
  window_width = window.innerWidth;

  // IF THE MAIN WINDOW IS CONSIDERED MOBILE SIZE | SET MOBILE DETECTED TO TRUE
  if (window_width < games_list.mobile_screen_size) mobile_detected = true;

  // GRAB THE WRAPPER TO THE GAMES LIST
  list_wrap = document.getElementById(games_list.game_list_wrapper);

  // CHECK IF THE USER IS LOGGED IN
  logged_in = await checkLogin();

  // LOOP THROUGH ALL THE GAMES TO SETUP THEIR PLAYERS
  for (const game of games_list.games) {

    // SET GAME LOCKED STATE BASED ON USER LOGGED IN OR NOT
    if (logged_in) game_locked = false;
    else game_locked = true;

    // CREATE THE TITLE OF EACH GAME
    const title = document.createElement('p');
    title.className = games_list.game_list_titles_classes;
    title.textContent = game.title;

    // CREATE THE TEXT DESCRIPTION FOR EACH GAME
    const desc = document.createElement('p');
    desc.className = games_list.game_list_description_classes;
    desc.textContent = game.description;

    // ADD A START BUTTON TO EACH GAME WRAP
    const start_button = document.createElement('button');
    start_button.type = 'button';
    start_button.className = 'minigame_play_button';
    start_button.textContent = 'Play game';
    
    // CHECK IF THE GAME REQUIRES LOGIN
    login_required = game.loginRequired;

    // CHECK IF THE USER IS LOGGED IN TO DISPLAY CERTAIN GAMES
    if (login_required && (!logged_in)) {
      game_locked = true;
    }

    // CHECK IF USER IS ON MOBILE OR IF GAME IS EVEN PLAYABLE
    if (mobile_detected || !game.playable) {
      game_locked = true;
    }

    // CREATE DIV FOR THE GAME WRAP
    const div = document.createElement('div');
    // SET THE DIVS CLASS BASED ON WHETHER THE GAME IS LOCKED OR NOT
    const className = games_list.game_wrappers_classes + (game_locked ? ' game_locked' : '')
    // SETS THE GAME LOCK ICON
    const gameLockIcon = games_list.game_locked_icon;
    // CREATE THE GAME LOCK TEXT ELEMENT
    const gameLockTitle = document.createElement('p');
    gameLockTitle.className = 'game_locked_title';

    // IF THE GAME IS NOT PLAYABLE
    if (!game.playable) {
      // LOCK THE GAME
      gameLockTitle.textContent = games_list.game_locked_unplayable_title;
    }
    // IF THE GAME IS PLAYABLE
    else {
      // CHECKS WHETHER OR NOT THE USER IS ON MOBILE
      gameLockTitle.textContent = mobile_detected ? games_list.game_locked_scrWidth_title : games_list.game_locked_signin_title;
    }

    // IF THE GAME IS NOT LOCKED
    if (!game_locked) {
      
      // ADD EVENT LISTENER TO THE START BUTTON
      start_button.addEventListener('click', () => {

        // OPEN THE MINI GAME
        openMiniGame(game);

      })
    }

    // SET THE CLASS OF THE DIV BASED ON ABOVE
    div.className = className;

    // CREATE LOCKED GAME DIV
    if (game_locked) {

      div.appendChild(title);
      div.appendChild(desc);
      div.insertAdjacentHTML('beforeend', gameLockIcon);
      div.appendChild(gameLockTitle);

    }
    // CREATE UNPLAYABLE GAME DIV
    else if (!game.playable) {

      div.appendChild(title);
      div.appendChild(desc);
      div.insertAdjacentHTML('beforeend', gameLockIcon);
      div.appendChild(gameLockTitle);

    }
    // CREATE PLAYABLE GAME DIV
    else {

      div.appendChild(title);
      div.appendChild(desc);
      div.appendChild(start_button);

    }
    // APPEND THE GAMES TO THE LIST WRAP
    list_wrap.appendChild(div);
  }
}

///////////////////////////////////////////
///                                     ///
///   CHECKS IF THE USER IS LOGGED IN   ///
///                                     ///
///////////////////////////////////////////
async function checkLogin() {

  // CHECK THE BACKEND IF THE USER IS LOGGED IN
  try {
    const response = await fetch(
      `${siteVariables.data_server.ip_address}/userinfo`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    // STORE THE DATA RETREIVED
    let data;

    try {
      data = await response.json();
    }
    catch {
      throw new Error("Invalid server response");
    }

    // IF THE USER IS NOT LOGGED IN
    if (!response.ok) {

      console.log("FULL SERVER RESPONSE:", data);
      return false;

    }

    // IF THE USER IS LOGGED IN
    return true;

  }
  // IF THERE IS AN ERROR OR USER NOT LOGGED IN
  catch (error) {

    console.log("User not logged in");

  }
}

