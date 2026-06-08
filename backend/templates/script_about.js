/////////////////////////////////////////////////
///                                           ///
///             ABOUT SCRIPT PAGE             ///
///                                           ///
/////////////////////////////////////////////////

// ALL IMPORTS 

import { siteVariables } from './script_variables.js';

//-----------------------------------------------------------------//

///////////////////////////////////////////
///                                     ///
///     FILL THE STAFF DATA SECTION     ///
///                                     ///
///////////////////////////////////////////
function fillStaffData() {

  // grab the element to put the staff stuff in
  const ownerWrapper = document.getElementById(siteVariables.about_page.ownerStaff_wrapper);

  // grab the element to put the staff stuff in
  const modWrapper = document.getElementById(siteVariables.about_page.modStaff_wrapper);

  siteVariables.minecraft_server.special_players.owners.forEach((owner) => {

    // create the div for each player wrapper
    const div = document.createElement('div');
    div.className = 'staff_wrapper';

    // create text element to place name inside of
    const p = document.createElement('p');
    const name = owner;
    p.textContent = name;

    // create an image for users profile pic
    const img = document.createElement('img');
    img.src = `https://minotar.net/avatar/${name}`;
    img.className = 'mc-face';
    
    div.appendChild(p);
    div.appendChild(img);

    ownerWrapper.appendChild(div);

  })

  siteVariables.minecraft_server.special_players.moderators.forEach((moderator) => {

    // create the div for each player wrapper
    const div = document.createElement('div');
    div.className = 'staff_wrapper';

    // create text element to place name inside of
    const p = document.createElement('p');
    const name = moderator;
    p.textContent = name;

    // create an image for users profile pic
    const img = document.createElement('img');
    img.src = `https://minotar.net/avatar/${name}`;
    img.className = 'mc-face';
    
    div.appendChild(p);
    div.appendChild(img);

    modWrapper.appendChild(div);

  })

}

fillStaffData();