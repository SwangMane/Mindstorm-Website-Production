/////////////////////////////////////////////////
///                                           ///
///             MAIN SCRIPT PAGE              ///
///                                           ///
/////////////////////////////////////////////////

// ALL IMPORTS 

import { backgroundSlideshow } from './script_background.js';
import { fillNavbar } from './script_nav.js';
import { fillMinecraftServerStats } from './script_mcserver.js';
import { createList } from './script_createList.js';
import { server_announcements, prevSeasonsList, siteVariables } from './script_variables.js';
import { createSeasons } from './script_seasons.js';

//-----------------------------------------------------------------//

// checks what page the user is currently on
// each page on the site has an id'd body searched for
function checkCurrentPage() {
    const currentPage = document.body.id;
    return currentPage;
}

// checks the data server to see if its online
async function checkDataServer() {
    try {
        // await a server response
        const response = await fetch(

            // address to the 'health' of the data server
            siteVariables.data_server.ip_address + siteVariables.data_server.health
        );
        // if there is a response but its bad
        if (!response.ok) {

            throw new Error();
        }
        // await a response of data
        const data = await response.json();

        console.log(data.status);

        return true;

    }
    // if the server is just flat offline
    catch {
        console.log("Data server offline");
        return false;
    }
}


// checks if the data server is online
checkDataServer();

// GRAB THE CURRENT PAGE
const page = checkCurrentPage();

// Starts the pages background slideshow based on the current page
backgroundSlideshow(page);

// Fills the nav bar according to the current page
fillNavbar(page);

// fills the minecraft server status if needed
fillMinecraftServerStats(page);

// if on the index page fill out the announcements list 
if (page === "index") {
    let spacer = true;
    let location = document.getElementById("announcements");
    // create a list of the server announcements 
    createList(server_announcements.announcements, server_announcements.list_id, server_announcements.li_class, null, location, spacer, 'yellow', null)
}


// if on the seasons page fill out the seasons list 
if (page === "seasons") {
    let spacer = false;
    let location = document.querySelector('#server_seasons');
    // create a list of all the available seasons on variables
    createList(prevSeasonsList, siteVariables.seasons_page.list_id, siteVariables.seasons_page.li_class, null, location, null, null, 'none');

    // fill the list of seasons with given information
    createSeasons();
}