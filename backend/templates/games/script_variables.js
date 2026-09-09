///////////////////////////////////////////
///                                     ///
///             ALL IMPORTS             ///
///                                     ///
///////////////////////////////////////////

///////////////////////////////////////////
///                                     ///
///        ALL LOCAL VARIABLES          ///
///                                     ///
///////////////////////////////////////////

///////////////////////////////////////////
///                                     ///
///   ALL GENERAL MINIGAME VARIABLES    ///
///                                     ///
///////////////////////////////////////////
export const games_list = {

  // STORE THE CURRENT GAME BEING PLAYED
  current_game: null,

  // MINIMUM SCREEN SIZE FOR GAMES TO BE PLAYED
  mobile_screen_size: 1280,

  // ID'D ITEMS TO GRAB
  game_popout_wrapper: 'game_popout_wrapper',
  game_wrapper: 'game_wrapper',
  game_list_wrapper: 'games_list_wrapper',
  game_popout_closebtn: 'close_minigame_button',

  // GAME WRAPPER CLASSES
  game_wrappers_classes: 'game_thumbnail_wrap flexed flexStart_centered column yellow_gradient_bcg',
  game_wrappers_classes_disabled: '',

  // GAME LIST CLASSES
  game_list_titles_classes: 'game_list_title press-start-2p-regular',
  game_list_description_classes: 'game_list_description fira-sans-regular',

  // GAME LOCKED ITEMS
  game_locked_signin_title: 'Must be signed in to play',
  game_locked_unplayable_title: 'This game is still under development',
  game_locked_icon: '<svg xmlns="http://www.w3.org/2000/svg" width="128px" height="128px" viewBox="0 0 24 24" fill="none"> <path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  game_locked_scrWidth_title: 'Games not available on mobile',

  // MESSAGE IF THE GAME FAILS TO LOAD
  failed_game_load: 'Failed to load game - Please try again later',

  // ALL GAMES AND THEIR INFO
  games: [

    // BLACKJACK
    {
      // GAMES TITLE
      title: 'Blackjack',
      // GAMES DESCRIPTION
      description: 'Ante up server points in a game of blackjack',
      // IF USER LOGIN IS REQUIRED
      loginRequired: true,
      // LINK TO THE GAME PAGE
      link: 'games_blackjack.html',
      // IF THE GAME IS PLAYABLE
      playable: true,
      // IF THE GAME REQUIRES A CANVAS
      needCanvas: false,
    },

    // QUEST FOR THE BUDDER BLOCK
    {
      // GAMES TITLE
      title: 'Quest for the budder block',
      // GAMES DESCRIPTION
      description: 'Join in on the hunt for the budder block',
      // IF USER LOGIN IS REQUIRED
      loginRequired: false,
      // LINK TO THE GAME PAGE
      link: 'games_budderBlock.html',
      // IF THE GAME IS PLAYABLE
      playable: false,
      // IF THE GAME REQUIRES A CANVAS
      needCanvas: true,
    }
  ],
}