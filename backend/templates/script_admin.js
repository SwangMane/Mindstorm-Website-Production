///////////////////////////////////////////
///                                     ///
///             ALL IMPORTS             ///
///                                     ///
///////////////////////////////////////////

import { siteVariables } from './script_variables.js';
import { getSiteUsers } from './script_getSiteUsers.js';

///////////////////////////////////////////
///                                     ///
///        ALL LOCAL VARIABLES          ///
///                                     ///
///////////////////////////////////////////

let users;

const variables = {
  // ADMIN PAGE ROLE SELECT
  role_selector: '#admin_page_roleSelect',
  // USER SELECTOR
  user_selector: '#admin_page_roleuserList',
}

///////////////////////////////////////////
///                                     ///
///     SETS UP THE ADMIN FUNCTIONS     ///
///                                     ///
///////////////////////////////////////////
export async function setupAdminPage() {

  // GRAB ALL USERS FROM BACKEND
  users = await getSiteUsers()

  // SETS UP THE DELETE USER FUNCTION
  setupDeleteUser();
  // SETS UP THE USER ROLE FUNCTION
  setupUserRole();
  // SETS UP THE GIVE COINS FUNCTION
  setupGiveCoins();

}


///////////////////////////////////////////
///                                     ///
///        DELETE USER FUNCTION         ///
///                                     ///
///////////////////////////////////////////
function setupDeleteUser() {

  // DECLARE VARIABLES
  let button;
  let button_active;
  let input;
  let username;

  // ASSIGN VARIABLES
  button = document.querySelector('#delete_user_btn');
  input = document.querySelector('#delete_user_input');
  button_active = false;
  button.disabled = true;

  // LISTEN FOR CHANGES TO THE DELETE PLAYER INPUT BOX
  input.addEventListener('input', () => {

    // IF THE BUTTON IS DISABLED, ENABLE IT
    if (!button_active) {
      button_active = true;
      button.disabled = false;

      // ADD THE LISTENER TO THE BUTTON FOR DELETE USER
      button.addEventListener('click', () => {
        username = input.value;
        deleteUser(username);
      })
    }

  })

  // FUNCTION TO DELETE USER
  async function deleteUser(username) {

      const result = prompt(
        'Are you sure you want to delete user: (' +
        username +
        ') from the database?\n\n' +
        'Type the user\'s name in the text box to confirm.\n\n' +
        '!!! There is no going back from this !!!'
      );

      if (result === null) {
        console.log('Canceling deletion of account: ' + username);
        return;
      }

      if (result !== username) {
        console.log('Username did not match. Canceling deletion of account: ' + username);
        alert('The username did not match. The account was NOT deleted.');
        return;
      }

      try {
          const response = await fetch(
              `${siteVariables.data_server.ip_address}/delete-user/${encodeURIComponent(username)}`,
              {
                  method: "DELETE",
                  credentials: "include"
              }
          );

          const data = await response.json();

          if (!response.ok) {
              console.error("Delete failed:", data);
              alert('Player ' + '" ' + username + ' "' + ' does not exist in our database. Please check spelling and try again.')
              return;
          }

          console.log("Delete successful:", data);

      } catch (error) {
          console.error("Delete request failed:", error);
      }

    console.log('Confirmed deletion of account: ' + username);
    alert('Confirmed deletion of account: ' + username);
  }

}


///////////////////////////////////////////
///                                     ///
///         CHANGE USER ROLE            ///
///                                     ///
///////////////////////////////////////////
async function setupUserRole() {

  // SETUP CONSTANTS
  const userSelect = document.querySelector(variables.user_selector);
  const roleSelect = document.querySelector(variables.role_selector);
  const saveRoleButton = document.getElementById("save_user_role");

  if (!userSelect) {
    console.error("User dropdown not found");
    return;
  }

  if (!roleSelect) {
    console.error("Role dropdown not found");
    return;
  }

  if (!saveRoleButton) {
    console.error("Save user role button not found");
    return;
  }


  ///////////////////////////////////////////
  // CREATE USER DROPDOWN
  ///////////////////////////////////////////

  let options = false;

  users.forEach(user => {

    const option = document.createElement("option");

    // FIRST OPTION
    if (!options) {

      option.value = "";
      option.textContent = "Select user";
      options = true;

    }
    // USER OPTIONS
    else {

      option.value = user;
      option.textContent = user;

    }

    userSelect.append(option);

  });


  // USER CHANGED
  userSelect.addEventListener("change", async () => {

    const selectedUser = userSelect.value;

    // Reset role and disable save button
    roleSelect.value = "";
    saveRoleButton.disabled = true;

    if (!selectedUser) {
      return;
    }

    try {

      // GET CURRENT ROLE
      const response = await fetch(
        `${siteVariables.data_server.ip_address}/user-role?user=${encodeURIComponent(selectedUser)}`,
        {
          method: "GET",
          credentials: "include"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to get user role"
        );
      }

      console.log("Current role:", data.role);

      // SET CURRENT ROLE
      roleSelect.value = data.role;

      // User has not changed anything yet
      saveRoleButton.disabled = true;

    } catch (error) {

      console.error("Failed to get user role:", error);

      roleSelect.value = "";
      saveRoleButton.disabled = true;

    }

  });


  // ROLE CHANGED
  roleSelect.addEventListener("change", () => {

    const selectedUser = userSelect.value;

    if (!selectedUser) {
      saveRoleButton.disabled = true;
      return;
    }

    // Enable save button
    saveRoleButton.disabled = false;

  });

  // SAVE ROLE
  saveRoleButton.addEventListener("click", async () => {

    const selectedUser = userSelect.value;
    const selectedRole = roleSelect.value;

    if (!selectedUser) {
      console.error("No user selected");
      return;
    }

    if (!selectedRole) {
      console.error("No role selected");
      return;
    }

    // Disable button while saving
    saveRoleButton.disabled = true;

    try {

      const response = await fetch(
        `${siteVariables.data_server.ip_address}/change-user-role`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user: selectedUser,
            role: selectedRole
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to save user role"
        );
      }

      console.log("Saved:", data);

      // Keep button disabled after successful save
      saveRoleButton.disabled = true;

    } catch (error) {

      console.error("Failed to save user role:", error);

      // Allow them to try again
      saveRoleButton.disabled = false;

    }

  });

}



///////////////////////////////////////////
///                                     ///
///     SETS UP GIVE COINS FUNCTION     ///
///                                     ///
///////////////////////////////////////////
function setupGiveCoins() {

  // DECLARE VARIABLES
  const button = document.querySelector('#give_user_coins_btn');
  const user = document.querySelector('#give_user_coins');
  const coinAmt = document.querySelector('#give_user_coins_amount');

  // BUTTON STARTS DISABLED
  button.disabled = true;

  // LISTEN FOR CHANGES TO THE INPUTS
  function checkInputs() {
    const hasUser = user.value.trim() !== "";
    const amount = Number(coinAmt.value);
    const hasAmount = coinAmt.value.trim() !== "" && Number.isFinite(amount) && amount > 0;

    button.disabled = !(hasUser && hasAmount);
  }

  // ADD EVENT LISTENERS
  user.addEventListener('input', checkInputs);
  coinAmt.addEventListener('input', checkInputs);

  // GIVE COINS
  button.addEventListener('click', async () => {

    const userName = user.value.trim();
    const coinAmount = Number(coinAmt.value);

    try {
      const response = await fetch("http://localhost:5000/api/give-user-coins", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_name: userName,
          coin_amount: coinAmount
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
          "Failed to give coins"
        );
      }

      // Successful response
      console.log("Give coins response:", data);

      alert(
        'Successfully gave ' +
        coinAmount +
        ' coins to "' +
        userName +
        '".'
      );

      // Optional: clear inputs
      user.value = "";
      coinAmt.value = "";
      button.disabled = true;

    } catch (error) {

      console.error("Give coins error:", error);

      alert(
        'Failed to give coins to "' +
        userName +
        '".\n\n' +
        (error.message || "An unknown error occurred.")
      );
    }
  });
}
