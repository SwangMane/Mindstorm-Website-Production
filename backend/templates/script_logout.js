/////////////////////////////////////////////////
///                                           ///
///           ACCOUNT LOGOUT SCRIPT           ///
///                                           ///
/////////////////////////////////////////////////

// ALL IMPORTS 

import { siteVariables } from './script_variables.js';

//-----------------------------------------------------------------//

///////////////////////////////////////////
///                                     ///
///        LOGOUT USER FUNCTION         ///
///                                     ///
///////////////////////////////////////////
export async function logout_user() {

  try {
    // send logout request to the backend
    const response = await fetch(
      `${siteVariables.data_server.ip_address}/logout`,
      {
        method: 'POST',
        credentials: 'include',
      }
    );

    let data;

    try {

      data = await response.json();

    } catch {

      throw new Error("Invalid server response");

    }

    // error logger
    if (!response.ok) {

      console.log("FULL SERVER RESPONSE:", data);

      const err = new Error(
        data?.error || data?.message || "Logout failed"
      );

      err.code = data?.code;
      err.status = response.status;

      throw err;
    }

    // redirect the user to their account page if successfull
    window.location.href = "login.html";

  } catch (error) {
    console.error("Full logout error:", error);

    // Better than string matching:
    switch (error.message) {
      case "Email does not exist":
        popup_notif("no_email");
        break;
    }
  }
}
