/////////////////////////////////////////////////
///                                           ///
///           MINIGAMES PAGE SCRIPT           ///
///                                           ///
/////////////////////////////////////////////////

// ALL IMPORTS 

import { loadBlackjack } from './script_game_blackjack.js';
import { siteVariables } from './script_variables.js';

//-----------------------------------------------------------------//

// all mini games on the website
const games_list = {

  game_popout_wrapper: 'game_popout_wrapper',

  game_popout_closebtn: 'close_minigame_button',

  game_list_wrapper: 'games_list_wrapper',

  game_wrappers_classes: 'game_thumbnail_wrap flexed flexStart_centered column yellow_gradient_bcg',
  game_wrappers_classes_disabled: '',

  game_list_titles_classes: 'game_list_title press-start-2p-regular',

  game_list_description_classes: 'game_list_description fira-sans-regular',

  game_locked_signin_title: 'Must be signed in to play',

  game_locked_unplayable_title: 'This game is still under development',

  game_locked_scrWidth_title: 'Games not available on mobile',

  games: [

    {

      // title displayed for minigame
      title: 'Blackjack',

      // games description
      description: 'Ante up server points in a game of blackjack',

      // if login is required
      loginRequired: true,

      // link to the games page
      link: 'games_blackjack.html',

      playable: false,

    },

    {

      // title displayed for minigame
      title: 'Quest for the budder block',

      // games description
      description: 'Join in on the hunt for the budder block',

      // if login is required
      loginRequired: false,

      // link to the games page
      link: 'games_budderBlock.html',

      playable: false,

    }

  
  ],

}

let initialized = false;

// fills the mini games list with the provided games
async function fillMinigames() {

  if (initialized) return;
  initialized = true;

  console.log("fillMinigames called");

  const windowWidth = window.innerWidth;

  let mobile_detected = false;

  if (windowWidth < 1400) mobile_detected = true;

  // grab the wrapper for the games list
  const listWrap = document.getElementById(games_list.game_list_wrapper);


  // loop through all games
  for (const game of games_list.games) {

    let game_locked = false;

    const title = document.createElement('p');
    title.className = games_list.game_list_titles_classes;
    title.textContent = game.title;

    const desc = document.createElement('p');
    desc.className = games_list.game_list_description_classes;
    desc.textContent = game.description;

    const start_button = document.createElement('button');
    start_button.type = 'button';
    start_button.className = 'minigame_play_button';
    start_button.textContent = 'Play game';
    

    // if login is required
    const login_required = game.loginRequired;

    // optionally verify user session
    if (login_required) {

      try {

        const response = await fetch(
          `${siteVariables.data_server.ip_address}/userinfo`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        let data;

        try {
          data = await response.json();
        }
        catch {
          throw new Error("Invalid server response");
        }

        if (!response.ok) {

          console.log("FULL SERVER RESPONSE:", data);

          const err = new Error(
            data?.error || data?.message || "Minigames | Account check failed"
          );

          err.code = data?.code;
          err.status = response.status;

          if (game.loginRequired) {
            
            game_locked = true;

          }

        }

        console.log(data);

      }
      catch (error) {

        console.log("User not logged in");

        game_locked = true;
      }
    }

    if (mobile_detected || !game.playable) {

      game_locked = true;

    }


    // create game card
    const div = document.createElement('div');

    const className = games_list.game_wrappers_classes + (game_locked ? ' game_locked' : '')

    const gameLockIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="128px" height="128px" viewBox="0 0 24 24" fill="none"> <path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    const gameLockTitle = document.createElement('p');
    gameLockTitle.className = 'game_locked_title';

    if (!game.playable) {

      gameLockTitle.textContent = games_list.game_locked_unplayable_title;

    }
    else {

      gameLockTitle.textContent = mobile_detected ? games_list.game_locked_scrWidth_title : games_list.game_locked_signin_title;

    }

    if (!game_locked) {
      
      start_button.addEventListener('click', () => {

        openMiniGame(game);

      })
    }

    div.className = className;

    if (game_locked) {

      div.appendChild(title);
      div.appendChild(desc);

      div.insertAdjacentHTML('beforeend', gameLockIcon);

      div.appendChild(gameLockTitle);

    }
    else if (!game.playable) {

      div.appendChild(title);
      div.appendChild(desc);

      div.insertAdjacentHTML('beforeend', gameLockIcon);

      div.appendChild(gameLockTitle);

    }
    else {

      div.appendChild(title);
      div.appendChild(desc);
      div.appendChild(start_button);

    }

    listWrap.appendChild(div);
  }
}

function openMiniGame(game) {

  // store the current game being opened
  const currGame = game;
  // the games popout wrapper
  const game_popout_wrapper = document.getElementById(games_list.game_popout_wrapper);
  // display the wrapper
  game_popout_wrapper.style.display = 'flex';


  const closeBtn = document.getElementById(games_list.game_popout_closebtn);
  closeBtn.addEventListener('click', () => {

    closeMiniGame();
    console.log("closing");

  }, {once: true})


  console.log(game.title);

  if (currGame.title === "Blackjack") {

    loadBlackjack(currGame);

  }

}
export function closeMiniGame() {

  const game_popout_wrapper = document.getElementById(games_list.game_popout_wrapper);

  game_popout_wrapper.style.display = 'none';

}


fillMinigames();
