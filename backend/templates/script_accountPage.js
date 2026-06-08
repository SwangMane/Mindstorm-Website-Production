/////////////////////////////////////////////////
///                                           ///
///             ACCOUNT PAGE SCRIPT           ///
///                                           ///
/////////////////////////////////////////////////

// ALL IMPORTS 

import { logout_user } from './script_logout.js';
import { siteVariables } from './script_variables.js';

//-----------------------------------------------------------------//

///////////////////////////////////////////
///                                     ///
///        ON ACCOUNT PAGE LOAD         ///
///                                     ///
///////////////////////////////////////////
window.onload = () => {

  // if were not of the account page exit this
  if (!document.querySelector('#account')) return;

  // grab the logout button
  const account_page_logout_btn = document.getElementById(
    siteVariables.account_page.logout_btn
  );

  // if the button exists
  if (account_page_logout_btn) {

    account_page_logout_btn.addEventListener('click', () => {

      // when the logout button is clicked
      logout_user();

    }, { once: true });

  }

  // call fill function
  fillAccountPage()
};


///////////////////////////////////////////
///                                     ///
///      FILL ACCOUNT PAGE DETAILS      ///
///                                     ///
///////////////////////////////////////////
export async function fillAccountPage() {

 try {

  // grab the users information from backend
  const response = await fetch(
    `${siteVariables.data_server.ip_address}/userinfo`,
    {
      method: 'GET',
      credentials: "include",
    }
  );

    let data;
    try {
      // all players data gathered
      data = await response.json();
    } 
    catch {
      throw new Error("Invalid server response");
    }

    // error logger
    if (!response.ok) {

      console.log("FULL SERVER RESPONSE:", data);

      const err = new Error(
        data?.error || data?.message || "Account page failed"
      );

      err.code = data?.code;
      err.status = response.status;

      throw err;
    }

    // fill the account page based on retrieved data
    fillPage(data);

    //console.log(data);


  } catch (error) {
    console.error("Full account page error:", error);

    // Better than string matching:
    switch (error.message) {
      case "":
        break;
    }
  }

  // call to fill the users account information
  function fillPage(account) {

    // store the account being pulled
    const data = account;

    // profile picture img tag
    const profile_pic = document.getElementById(siteVariables.account_page.profile_picture);
    const picture_link = data.user.user_profilePicture;
    profile_pic.src = picture_link;

    // username stuff
    const account_username = document.getElementById(siteVariables.account_page.minecraft_username);
    const username = data.user.user_name;
    account_username.textContent = username;

    // user join date stuff
    const account_joinDate = document.getElementById(siteVariables.account_page.user_joinDate);
    const joindate = data.user.user_joinDate;
    account_joinDate.textContent = joindate;

    // user server coins stuff
    const account_serverCoins = document.getElementById(siteVariables.account_page.user_serverCoins);
    const serverCoins = data.user.user_serverPoints;
    account_serverCoins.textContent = serverCoins;

    // user role
    const account_role = document.getElementById(siteVariables.account_page.user_role);
    const serverRole = data.user.user_role;
    account_role.textContent = serverRole;

    // user playstyle
    const user_playstyle = document.getElementById(siteVariables.account_page.user_playstyle);
    const currentPlaystyle = data.user.user_playstyle;

    // save button on account page
    const saveButton = document.getElementById(siteVariables.account_page.user_saveChanges);


    // if the user previously selected a playstyle - display it
    if (currentPlaystyle) user_playstyle.value = currentPlaystyle;

    // listen for changes on the playstyle dropdown
    user_playstyle.addEventListener("change", () => {

      // grab the selected playstyle from the dropdown - the value
      const selectedPlaystyle = user_playstyle.value;

      // enable the save button on changes
      saveButton.disabled = false;
      saveButton.removeEventListener('click', () => {})

      saveButton.addEventListener('click', () => {

        // save the profile with given info - disable save button
        saveProfile(selectedPlaystyle);
        saveButton.disabled = true;

      }, {once: true});

    });
      
  }

}

///////////////////////////////////////////
///                                     ///
///        SAVE PROFILE FUNCTION        ///
///                                     ///
///////////////////////////////////////////
async function saveProfile(playstyle) {

  // Take the users selected play style and save it to the backend
  const response = await fetch(
    `${siteVariables.data_server.ip_address}/save-playstyle`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        playstyle: playstyle
      })
    }
  );

  const data = await response.json();
}