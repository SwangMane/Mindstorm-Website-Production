///////////////////////////////////////////
///                                     ///
///             ALL IMPORTS             ///
///                                     ///
///////////////////////////////////////////

import { siteVariables } from '../../script_variables.js';

///////////////////////////////////////////
///                                     ///
///        ALL LOCAL VARIABLES          ///
///                                     ///
///////////////////////////////////////////

///////////////////////////////////////////
///                                     ///
///   GRAB THE CURRENT USERS ACC INFO   ///
///                                     ///
///////////////////////////////////////////
export async function loadGamesAccount() {

  try {

  // GRAB THE USERS DATA FROM THE BACKEND
  const response = await fetch(
    `${siteVariables.data_server.ip_address}/userinfo`,
    {
      method: 'GET',
      credentials: "include",
    }
  );

    // DECLARE VARIABLES
    let data;

    try {
      // SAVE THE PLAYERS DATA
      data = await response.json();
    } 
    catch {
      throw new Error("Invalid server response");
    }

    // IF THERE IS A BAD DATA RESPONSE
    if (!response.ok) {

      console.log("FULL SERVER RESPONSE:", data);

      const err = new Error(
        data?.error || data?.message || "Games page failed | Account fetch"
      );

      err.code = data?.code;
      err.status = response.status;

      throw err;
    }

    // USERS INFO TO PASS TO THE GAME LOADER
    const picture_link = data.user.user_profilePicture;
    const username = data.user.user_name;
    const serverCoins = data.user.user_serverPoints;

    return [picture_link, username, serverCoins];

  // ERROR CATCHER
  } catch (error) {
    console.error("Full games page error:", error);

    // CALL FAILED GAME LOAD 
    failedGameLoad();

    // Better than string matching:
    switch (error.message) {
      case "":
        break;
    }
  }
}