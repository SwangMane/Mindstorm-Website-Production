/////////////////////////////////////////////////
///                                           ///
///           MC SERVER SCRIPT PAGE           ///
///                                           ///
/////////////////////////////////////////////////

// ALL IMPORTS 

import { siteVariables } from './script_variables.js';

// The server/port in reference is the minecraft server
// Minecraft server ip and port numbers are listed in script_variables.js 
// use this website to get more variables https://mcapi.us/#usage
export async function fillMinecraftServerStats(page) {
    return new Promise((resolve) => {

        // Index page server check stuff
        if (page === "index") {

            // ping the minecraft server with the IP listed in script_variables.js
            MinecraftAPI.getServerStatus(siteVariables.minecraft_server.ip_address, {
                port: siteVariables.minecraft_server.port_number
                }, async function (err, status) {

                // the wrapper for the server status elements
                let serverInfoWrap = document.querySelector('#server_status_wrap');

                // the current minecraft server image
                const serverImg = document.querySelector('.server_icon');
                serverImg.src = siteVariables.minecraft_server.server_icon;

                // the last updated section 
                const lastUpdate = document.getElementById("last_updated");
                lastUpdate.textContent = siteVariables.minecraft_server.msg_lastUpdate;

                // create the meter for the player count
                const playerCount_meter = document.createElement('meter');
                playerCount_meter.id = 'player_count_meter';

                let serverStatus;   // server status
                let serverIp; // server IP
                let minecraftVersion // minecraft version
                let playerCount // the servers player count


                serverIp = await getServerIp();
                // set the server IP section
                //serverIp = `<p class="server_status_item">Server IP: ${siteVariables.minecraft_server.ip_address}</p>`;

                // the minecraft version section
                minecraftVersion = `<p class="server_status_item">Game Version: ${siteVariables.minecraft_server.version_number}</p>`;

                //////////////////////////////////////////////////
                ///                                            ///
                ///        If the server CANT be reached       ///
                ///                                            ///
                //////////////////////////////////////////////////
                if (err || !status.online) {

                    // display the offline message
                    serverStatus = `<p class="server_status_item">${siteVariables.minecraft_server.msg_offine}</p>`;

                    // display a 0 player count
                    playerCount = `<p class="server_status_item">${siteVariables.minecraft_server.msg_playerCount}0</p>`;

                    // display the 'msg_offline_players' message
                    document.querySelector('.player_list').innerHTML = siteVariables.minecraft_server.msg_offline_players;

                    // set the meter values
                    playerCount_meter.max = 0;
                    playerCount_meter.value = 0;

                }
                //////////////////////////////////////////////////
                ///                                            ///
                ///        If the server CAN be reached        ///
                ///                                            ///
                //////////////////////////////////////////////////
                else {
                    // display the status of the server
                    serverStatus = `<p class="server_status_item">${status.online ? siteVariables.minecraft_server.msg_online : siteVariables.minecraft_server.msg_offine}</p>`;

                    // display the player count
                    playerCount = `<p class="server_status_item">${siteVariables.minecraft_server.msg_playerCount}` + ' ' + (status.players.now + '/' + status.players.max) + `</p>`;
                
                    if (status.players.sample && status.players.sample.length > 0) {

                        let player_class;
                        let hover_state;

                        // if there are people actually online
                        // create an object inside the playerList array for each player online
                        status.players.sample.forEach(player => {


                            // loop through all owners
                            siteVariables.minecraft_server.special_players.owners.forEach(owner => {

                                // if the players name matches one of the owners names
                                if (player.name === owner) {

                                    player_class = 'owner_class';
                                    hover_state = "Part-owner";

                                    siteVariables.minecraft_server.current_players.push(`<li class="${player_class}" data-description="${hover_state}"><img class="mc-face" src="https://minotar.net/avatar/${player.name}/32"><p>${player.name}</p></l1>`);

                                }
                            })
                            // loop through all moderators
                            siteVariables.minecraft_server.special_players.moderators.forEach(moderator => {

                                // if the players name matches one of the mods names
                                if (player.name === moderator){

                                    player_class = 'moderator_class';
                                    hover_state = "Moderator";

                                    siteVariables.minecraft_server.current_players.push(`<li class="${player_class}"><img class="mc-face" src="https://minotar.net/avatar/${player.name}/32"><p>${player.name}</p></l1>`);

                                }
                            })

                            if (player_class) return;
                           
                            else {
                                
                                player_class = 'standard_class';
                                siteVariables.minecraft_server.current_players.push(`<li class="${player_class}"><img class="mc-face " src="https://minotar.net/avatar/${player.name}/32"><p>${player.name}</p></l1>`);

                            }

                        });                                                                                                                              // also places the characters skin icon next to name
                        document.getElementById(siteVariables.minecraft_server.current_players_list).innerHTML = siteVariables.minecraft_server.current_players.join(''); // displays the array in the HTML element
                    }
                    // if no one is online | no one online server message
                    else {
                        // no one online message
                        document.querySelector('.player_list').innerHTML = siteVariables.minecraft_server.msg_current_players_0;
                    }
                    
                    // set the meter values
                    playerCount_meter.max = status.players.max;
                    playerCount_meter.value = status.players.now;
                }

                // a break element to add
                const br = `<br>`;

                // once complete add all elements to the server info wrapper
                serverInfoWrap.innerHTML += serverStatus + serverIp + minecraftVersion + playerCount;

                // lastly append the meter to the div
                serverInfoWrap.appendChild(playerCount_meter);

                resolve(status);

            })
        }
        // if not on any pages above | resolve out
        else {
            resolve();
        }
    });
}


async function getServerIp() {

    try {
        const response = await fetch(
            `${siteVariables.data_server.ip_address}/userinfo`,
            {
                method: 'GET',
                credentials: 'include',
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return `<p class="server_status_item">Server IP: Login to view IP</p>`;
        }

        return `<p class="server_status_item">Server IP: ${siteVariables.minecraft_server.ip_address}</p>`;
    }
    catch (error) {
        console.error(error);

        return `<p class="server_status_item">Server IP: Login to view IP</p>`;
    }
}

