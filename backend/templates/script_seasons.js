/////////////////////////////////////////////////
///                                           ///
///       CREATE SEASONS SCRIPT PAGE          ///
///                                           ///
/////////////////////////////////////////////////

// ALL IMPORTS 

import { siteImages, prevSeasonsList, siteVariables } from './script_variables.js';

//-----------------------------------------------------------------//

// used to create a list with the given specifications | createList(name, 'ID', 'ID', location, spacer, spacerColor, index(list index if wanted), background (if wanted), subtitle (if wanted))
export async function createSeasons() {

const currPlayersList = await getUsernames();

const currPlayersListDiv = document.getElementById(siteVariables.seasons_page.current_season_members);

currPlayersList.forEach((player) => {

  // create the div for each player wrapper
  const div = document.createElement('div');
  div.className = 'current_players_wrapper press-start-2p-regular standard_class';

  // create text element to place name inside of
  const p = document.createElement('p');
  const name = player;
  p.textContent = name;

  // create an image for users profile pic
  const img = document.createElement('img');
  img.src = `https://minotar.net/avatar/${name}`;
  img.className = 'mc-face';

  let hover_state;
  hover_state = "standard player"

  // loop through all owners
  siteVariables.minecraft_server.special_players.owners.forEach(owner => {

    // if the players name matches one of the owners names
    if (player === owner) {


      div.className = 'current_players_wrapper press-start-2p-regular owner_class';
      hover_state = "Part-Owner";

    }
  })
  // loop through all moderators
  siteVariables.minecraft_server.special_players.moderators.forEach(moderator => {

    // if the players name matches one of the mods names
    if (player === moderator){

      div.className = 'current_players_wrapper press-start-2p-regular moderator_class';
      hover_state = "Moderator";

    }
  })
  
  div.appendChild(p);
  div.appendChild(img);
  div.dataset.description = hover_state;

  currPlayersListDiv.appendChild(div);

})

prevSeasonsList.forEach(season => {
  const li = document.getElementById(season.tagName);

  if (!li) return;

  // use first picture as background
  const bgImage = Array.isArray(season.pics)
  ? season.pics[0]
  : season.pics;

  li.style.backgroundImage = `url(${bgImage})`;

  // create content container
  const content = document.createElement('div');
  content.className = 'season_content';

  // name
  const nameP = document.createElement('p');
  nameP.className = 'season_name';
  nameP.textContent = season.name;

  // date
  const dateP = document.createElement('p');
  dateP.className = 'season_date';
  dateP.textContent = season.date;

  li.addEventListener('click', (e) => {
    e.stopPropagation();

    // open your menu here
    console.log(`Open menu for ${season.name}`);

    openSeason(season.name);

  });

  // append everything
  content.appendChild(nameP);
  content.appendChild(dateP);

  li.appendChild(content);

  })
}


function openSeason(name) {


  // enable the faded background
  const bcg = document.getElementById(siteVariables.background_fader);


  bcg.style.display = 'block';
  bcg.classList.add('fade_in_1s');


  const clickedSeason = name;

  // set the outside wrapper as a constant
  const wrapperOut = document.getElementById(siteVariables.seasons_page.season_wrapper_out);

  // set the inside wrapper as a constant
  const wrapperIn = document.getElementById(siteVariables.seasons_page.season_wrapper_in);

  const addClass = 'fade_in_1s';

  // OPEN MODAL
  wrapperOut.style.display = 'flex';
  wrapperOut.classList.add(addClass);

  // CLOSE FUNCTION
  function closeSeason() {
    wrapperOut.classList.remove(addClass);
    wrapperOut.style.display = 'none';
    bcg.style.display = 'none';

    document.removeEventListener('click', outsideClickListener);
  }


  // OUTSIDE CLICK
  function outsideClickListener(event) {

    // ignore clicks inside wrapper
    if (wrapperOut.contains(event.target)) return;

    closeSeason();
  }

  // prevents instant close
  setTimeout(() => {
    document.addEventListener('click', outsideClickListener);
  }, 0);

  // check each season for id match
  prevSeasonsList.forEach(season => {

    // if id matches clicked season
    if (clickedSeason === season.name) {

      // clear the wrapper 
      wrapperIn.innerHTML = '';

      const classes = 'season_description_item green_gradient_bcg';
      const pretextClasses = 'yellow season_pretext';

      // the title is the seasons name
      const title = document.createElement('p');
            title.className = classes;
            title.innerHTML = `<span class="${pretextClasses}">Season: </span>` + season.name;

      // seasons date
      const date = document.createElement('p');
            date.className = classes;
            date.innerHTML = `<span class="${pretextClasses}">Date: </span>` + season.date; 

      // seasons version
      const version = document.createElement('p');
            version.className = classes;
            version.innerHTML = `<span class="${pretextClasses}">Version: </span>` + season.version;

      // seasons description
      const description = document.createElement('p');
            description.className = classes;
            description.innerHTML = `<span class="${pretextClasses}">Description: </span>` + season.desc;

      // members title
      const memberTitle = document.createElement('p');
            memberTitle.classList = 'members_title green_gradient_bcg';
            memberTitle.innerHTML = `<span class="${pretextClasses}">Season Members</span>`;

      // seasons memberlist
      const memberList = document.createElement('ul');
            memberList.className = 'gray_gradient_bcg';


      // loop through each member and add them to the list of members
      season.members.forEach((member) => {

        const memberElement = document.createElement('li');
        memberElement.className = 'cinzel-bold';
        memberElement.textContent = member;

        memberList.appendChild(memberElement);

      })

      const viewer = document.createElement('div');
      viewer.className = 'img_viewer';

      const track = document.createElement('div');
      track.className = 'img_track';

      viewer.appendChild(track);

      season.pics.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'slide';

        track.appendChild(img);
      });

      let index = 0;

      function updateSlider() {
        track.style.transform = `translateX(-${index * 100}%)`;
      }

      const next = document.createElement('button');
      next.textContent = '>';
      next.className = 'season_pictures_Btn btn_next';

      const prev = document.createElement('button');
      prev.textContent = '<';
      prev.className = 'season_pictures_Btn btn_prev';

      next.addEventListener('click', () => {
        index = (index + 1) % season.pics.length;
        updateSlider();
      });

      prev.addEventListener('click', () => {
        index = (index - 1 + season.pics.length) % season.pics.length;
        updateSlider();
      });

      viewer.append(prev, track, next);


      // display all the information given
      wrapperIn.replaceChildren(title, date, version, description,memberTitle, memberList, viewer);

    }

  });
}

async function getUsernames() {
    try {
        const response = await fetch(
            `${siteVariables.data_server.ip_address + siteVariables.seasons_page.usersFetch}`,  
            {
                credentials: 'include'
            }
        );

        const data = await response.json();

        return data;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}