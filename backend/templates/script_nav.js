/////////////////////////////////////////////////
///                                           ///
///               THE NAV PAGE                ///
///                                           ///
/////////////////////////////////////////////////

// ALL IMPORTS 

import { siteIcons, siteVariables, navBarItems } from './script_variables.js';
import { getUserStatus } from './script_login.js';

//-----------------------------------------------------------------//

// function to fill the navbar 
// detects what page its currently on to add the 'current page' hightlight
export async function fillNavbar(page) {

  // log users current viewing page
  console.log('user currently viewing ' + page + ' page');

  // grab the users login status 
  const userData = await getUserStatus();

  // grab the nav element on the current page
  const nav = document.querySelector('nav');

  // grab the nav list element on the current page
  const navList = document.querySelector('#navbar_list');
  
  // if the nav bar is found
  if (nav) {
    console.log("nav bar found");

    // setting a template 
    let html = "";

    // look for the menu toggler
    const menuToggler = document.querySelector('.nav_toggle');

    // if the menu toggler button is found - aka screen is smaller than 1280px
    if (menuToggler) {
      menuToggler.addEventListener("click", () => {
          nav.classList.toggle("display");
      });
    }

    // grabs the navBarItems object and filters it
    // object is found in variables.js
    Object.entries(navBarItems.sitePages)
      .filter(([key, item]) =>
        typeof item.contents === "function" &&
        item.displayed === true
      )
      .sort(([, a], [, b]) => a.priority - b.priority)
      .forEach(([key, item]) => {

        let processedItem = item;

        if (key === "login") {
          processedItem = {
            ...item,
            title: userData?.logged_in
              ? userData.user
              : "Login"
          };
        }

        html += processedItem.contents(processedItem, key === page);
      });

    navList.innerHTML = html;

  }
  // if no navbar is found
  else {
    console.log("nav not found");
  }
  
  // fill the server status indicator 
  MinecraftAPI.getServerStatus(siteVariables.minecraft_server.ip_address, {
  port: siteVariables.minecraft_server.port_number
  }, function (err, status) {

    // If the server can't be reached | offline (red circle)
    if (err || !status.online) {
      document.querySelector('#server_status_icon').innerHTML = siteIcons.offline; // red circle for offline
    }
    // if the server can be reached | offline (red circle) OR online (green circle)
    else {
      document.querySelector('#server_status_icon').innerHTML = status.online ? siteIcons.online : siteIcons.offline;
    }
  })
}