/////////////////////////////////////////////////
///                                           ///
///             ADMIN PAGE SCRIPT             ///
///                                           ///
/////////////////////////////////////////////////

import { siteVariables } from './script_variables.js';

// SETS UP EACH PART OF THE ADMIN PAGE
export function setupAdminPage() {

  // SETS UP THE DELETE USER FUNCTION
  setupDeleteUser();

  setupUserRole();

}

// SETS UP THE DELETE USER FUNCTION
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

async function setupUserRole() {
  const roleSelect = document.querySelector('#admin_page_roleSelect');

  if (!roleSelect) {
    console.error("Role dropdown not found");
    return;
  }

  try {
    const response = await fetch(`${siteVariables.data_server.ip_address}/user-role`,
      {
        method: 'GET',
        credentials: 'include'
      }
    );

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error("Invalid server response");
    }

    if (!response.ok) {
      console.log("FULL SERVER RESPONSE:", data);

      throw new Error(
        data?.error ||
        data?.message ||
        "Failed to get user role"
      );
    }

    console.log("Current user role:", data.role);

    // Set dropdown to the user's current role
    roleSelect.value = data.role;

  } catch (error) {
    console.error("User role error:", error);
  }
}