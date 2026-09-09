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
///      FAILED TO LOAD THE GAME        ///
///                                     ///
///////////////////////////////////////////
//
//  # CALLED WHEN A GAME FAILS TO LOAD
//  # COULD BE CAUSED BY A NUMBER OF REASONS SUCH AS
//  # USER NOT LOGGED IN / 
//
export function failedGameLoad(title) {

  // CONSOLE LOG
  console.log('Failed to load game | ' + title);

  // DECLARE VARIABLES 
  let p;

  // SETUP VARIABLES
  p = document.createElement('p');
  p.textContent = games_list.failed_game_load;
  p.classList = 'game_error_message';

  // GRAB THE GAME WRAPPER
  const game_popout_wrapper = document.getElementById(games_list.game_wrapper);

  // APPEND THE MESSAGE TO THE DIV
  game_popout_wrapper.append(p);

}