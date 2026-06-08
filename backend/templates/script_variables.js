/////////////////////////////////////////////////
///                                           ///
///             ALL VARIABLES PAGE            ///
///                                           ///
/////////////////////////////////////////////////

// ALL IMPORTS 

import { generateNavItem } from './script_createNav.js';
import { getUserStatus } from './script_login.js';

//-----------------------------------------------------------------//

/*     
  site colors 

  red   (scarlet)  = #AB202A (171, 32, 42)
  grey-blue        = #335549
  Yellow           = #f5d43e 
  off-white        = #faf9eb
  grey             = #545454
  black (not 100%) = #15141A (21, 20, 26)  
  black            = #000000

*/

///////////////////////////////////////////
///                                     ///
///         ALL SITE VARIABLES          ///
///                                     ///
///////////////////////////////////////////
export const siteVariables = {

    // amount of time per refresh on the background
    background_refresh: 10000,

    background_fader: 'page_fader_div',

    // all minecraft server details
    minecraft_server: {

        current_modpack_link: 'https://www.curseforge.com/minecraft/modpacks/mindstorm-cobblemon-season-3/preview',

        // current player list id 
        current_players_list: 'current_player_list',

        // current player list | gets filled out with minecraft API
        current_players: [],

        // IP to the minecraft server
        ip_address: '136.33.21.32', // place server ip inside '' here

        // port number of the minecraft server
        port_number: 25565, // place server port (just numbers) here

        // version of the minecraft server
        version_number: "1.21.1",

        // current server icon
        server_icon: "images/cobblemonIcon.png",

        // server offline message
        msg_offine: `Server is <span class="red">offline</span>`,

        // server offline message in player section
        msg_offline_players: `Server is currently offline`,

        // server online but no players
        msg_current_players_0: 'Server is empty',

        // server online message
        msg_online: `Server is <span class="green">online</span>`,

        // the last time the server was updated
        msg_lastUpdate: 'Server Status Updated: ' + new Date(),

        // the player count message
        msg_playerCount: 'Player count: ',

        // special player rules for the players online page
        special_players: {

            // all owners
            owners: [ 'DARKminerKS', 'HillbillyDeluex', 'Blockk', 'sirmah'],

            // all moderators
            moderators: ['Strontium38','theJman12', 'Outlawe', 'Sandor_RAI'],

        }
    },

    // all backend server details
    data_server: {

        // IP to the data server
        ip_address: 'https://mindstormgames.com/api',//'http://localhost:5000',

        // route to check status of server
        health: '/health',

        // route to check Minecraft username
        Minecraft_username: '/mcprofile/',

        // route to check user login status
        user_status: '/userstatus',

    },

    // login page items 
    login_page: {

        // new users password length
        required_password_length: 10,

        // mojang API username request
        mojangAPI_usernameCheck: 'https://api.minecraftservices.com/minecraft/profile/lookup/',

        // id for the login popup wrapper
        popup_wrapper: 'login_popup_wrapper',

        popup_contents: 'login_popup',

        // id for the login popup wrapper close btn
        popup_close_btn: 'close_login_popup_btn',

    },

    // account page items 
    account_page: {

        info_fetch: '/userinfo',

        logout_btn: 'account_page_logout',

        minecraft_username: 'account_page_username',

        profile_picture: 'account_page_profilePicture',

        user_joinDate: 'account_page_joinDate',

        user_serverCoins: 'account_page_serverCoins',

        user_role: 'account_page_serverRole',

        user_playstyle: 'account_page_styleSelect',

        user_saveChanges: 'account_page_saveChanges',

    },

    // server seasons items
    seasons_page: {

        // id of seasons list
        list_id: 'server_seasons_list',

        // class of each item in the list
        li_class: 'season_wrap yellow',

        // wrapper of the season details
        season_wrapper_out: 'season_expanded_wrapper_out',

        season_wrapper_in: 'season_expanded_wrapper_in',

        // season details closers
        close_seasons_btn: 'close_seasons',

        current_season_members: 'current_season_members_list',

        usersFetch: '/usernames',

    },

    // about page stuff
    about_page: {

        // wrapper for the staff info 
        ownerStaff_wrapper: 'about_staffWrap',

        modStaff_wrapper: 'about_modWrap'

    },
}

///////////////////////////////////////////
///                                     ///
///       ALL SERVER ANNOUNCEMENTS      ///
///                                     ///
///////////////////////////////////////////
export const server_announcements = {

    // the list of announcements in order
    announcements: [
        'Mindstorm website version 3 is now live! <a href="login.html">Create an account</a> and join our community! (More coming soon)',
        `Mindstorm Cobblemon season 3 start date: <span class="underline_text">6/6/2026</span> | <a href=${siteVariables.minecraft_server.current_modpack_link}>View our current modpack here</a>`,
        '<span class="yellow">DARKminerKS</span> will be <span class="yellow">out of town starting 6/12 until 6/19.</span> Please contact all other staff for issues',
        'Please welcome all of our new members!',
    ],

    // id 
    list_id: 'announcement_list',

    // class of each item in the list
    li_class: 'announcement offWhite_text',
};

///////////////////////////////////////////
///                                     ///
///           ALL SITE ICONS            ///
///                                     ///
///////////////////////////////////////////
export const siteIcons = {

    // the offline (red circle) icon
    offline: '&#128308',

    // the online (green circle) icon
    online: '&#128994;',

    // hamburger menu icon || to open nav
    closedText: '&#9776;',

    // just a norma X || to close nav
    openText: 'X',

}

///////////////////////////////////////////
///                                     ///
///     ALL SITE BACKGROUND IMAGES      ///
///                                     ///
///////////////////////////////////////////
export const siteImages = {
    // main page (splash) background pictures
    index: [    "images/backgrounds/season6PicFireworks.jpg",   /* Fireworks-Island-Season5 */ 
                "images/backgrounds/season4PicTownhall.jpg",    /* season4-Townhall */ 
                "images/backgrounds/season5PicDarkCastle.jpg",  /* season5-DARKS-Castle */
    ],
    about: [    "images/backgrounds/cobblemon_season_1_14.png",   /* cobblemon season 1 tournament sign */ 
                "images/backgrounds/season4PicTownhall.jpg",    /* season4-Townhall */ 
                "images/backgrounds/season5PicDarkCastle.jpg",  /* season5-DARKS-Castle */
    ],
    seasons: [  "images/backgrounds/season6PicFireworks.jpg",   /* Fireworks-Island-Season5 */ 
                "images/backgrounds/season4PicTownhall.jpg",    /* season4-Townhall */ 
                "images/backgrounds/season5PicDarkCastle.jpg",  /* season5-DARKS-Castle */
    ],
    games: [    "images/backgrounds/season6PicFireworks.jpg",   /* Fireworks-Island-Season5 */ 
                "images/backgrounds/season4PicTownhall.jpg",    /* season4-Townhall */ 
                "images/backgrounds/season5PicDarkCastle.jpg",  /* season5-DARKS-Castle */
    ],
    forum: [    "images/backgrounds/season4PicTownhall.jpg",    /* season4-Townhall */ 
                "images/backgrounds/season6PicFireworks.jpg",   /* Fireworks-Island-Season5 */ 
                "images/backgrounds/season5PicDarkCastle.jpg",  /* season5-DARKS-Castle */
    ],    
    login: [    "images/backgrounds/cobblemon_season_1_10.png",   /* cobblemon season 1 random picture */ 
                "images/backgrounds/cobblemon_season_1_21.png",    /* cobblemon season 1 bunch of tnt */ 
                "images/backgrounds/season6PicFireworks.jpg",   /* Fireworks-Island-Season5 */
    ],
    account: [    "images/backgrounds/background_account_1.png",   /* cave background */ 
                "images/backgrounds/background_account_2.png",    /* cave background */ 
    ],
    placeHolder: [  "images/placeholder.jpg",   /* Placeholder-image */
    ],
};


///////////////////////////////////////////
///                                     ///
///       ALL ITEMS USED IN NAVBAR      ///
///                                     ///
///////////////////////////////////////////
const userData = await getUserStatus();

export const navBarItems = {

    // all individual site pages | priority number
    sitePages: {

        index: {
            title: "Home",
            link: "index.html",
            priority: 1,
            displayed: true,
            contents: (item, isActive = false) =>
                generateNavItem(item, isActive)
        },

        about: {
            title: "Our story",
            link: "about.html",
            priority: 2,
            displayed: true,
            contents: (item, isActive = false) =>
                generateNavItem(item, isActive)
        },

        seasons: {
            title: "All seasons",
            link: "seasons.html",
            priority: 3,
            displayed: true,
            contents: (item, isActive = false) =>
                generateNavItem(item, isActive)
        },

        games: {
            title: "Minigames",
            link: "games.html",
            priority: 4,
            displayed: true,
            contents: (item, isActive = false) =>
                generateNavItem(item, isActive)
        },

        forum: {
            title: "Forum",
            link: "forum.html",
            priority: 5,
            displayed: true,
            contents: (item, isActive = false) =>
                generateNavItem(item, isActive)
        },

        login: {
            userData,

            title: userData.logged_in
                ? userData.user
                : "Login",

            link: userData.logged_in
                ? "account.html"
                : "login.html",

            priority: 6,
            displayed: true,
            liClass: "login_link",

            contents: (item, isActive = false) =>
                generateNavItem(item, isActive)
        }
    }
};


///////////////////////////////////////////
///                                     ///
///    ALL PREVIOUS SEASONS DETAILS     ///
///                                     ///
///////////////////////////////////////////
export const prevSeasonsList = [
    {
        name: 'Vanilla Season 1',
        tagName: 'vanS1',
        date: '2013',
        version: 'vanilla 1.6',
        desc: 'New beggining',
        members: ['Dark', 'Debesk', 'Block', 'The_Cakeinator', 'BilateralPaper4', 'Mas'],
        pics: genSeasonPics(1, 24, 'avif'), // season 1 | 24 pics in gallery
    },  
    {
        name: 'Vanilla Season 2',
        tagName: 'vanS2',
        date: 'Date unknown',
        version: 'Version unknown',
        desc: 'The forgotten season | If you have any information on this, contact DARKminerKS',
        members: ['Dark', 'Debesk', 'Block', 'Smilee', 'TheFull98', 'Dawson12XD', 'Hagermans_Rule', 'Sadfaic', 'Propally', 'SharpKiller', 'TheDooieBall', 'Allanarruda', 'Bubluebu', 'Shane', 'HotLava'],
        pics: siteImages.placeHolder, //genSeasonPics(?, ?), 
    },
    {
        name: 'Vanilla Season 3',
        tagName: 'vanS3',
        date: '2014',
        version: '1.9',
        desc: 'Savanah Spawn, yaDead arena',
        members: ['Dark', 'Debesk', 'Block', 'Smilee', 'Pudding', 'Hagermans_Rule', 'Yadead1', 'Yadead2', 'TheFull98', 'ImmortalNerd', 'Allanarruda', 'MrTall', 'Dominionus', 'GuitarHero', 'Kiwi', 'iJevinator', 'CE_Winchester', 'Grahm', 'HotLava'],
        pics: genSeasonPics(3, 11, 'avif'), // season 3 | 11 pics in gallery
    },
    {
        name: 'Vanilla Season 4',
        tagName: 'vanS4',
        date: '2015',
        version: '1.12',
        desc: 'Mindstorms greatest season. Massive town hall, sprawling spawn town, nether hub, insane bases and awesome minigames.',
        members: ['Dark', 'Debesk', 'Block', 'Smilee', 'Pudding', 'HillbillDeluex', 'alexSirben', 'TheFull98', 'Alexanderrisom', 'menda94', 'Grahm', 'PsychoSammy', 'CyberPunk', 'Deadspace', 'Zufgus', 'Victorbjr', 'ColdParasite', 'Hagermans_Rule', 'Cam_2002', 'Hyperinsomniac', 'Foxtrott', 'GuitarHero'],
        pics: genSeasonPics(4, 49, 'avif'), // season 4 | 49 pics in gallery
    },
    {
        name: 'Vanilla Season 5',
        tagName: 'vanS5',
        date: 'Date unknown',
        version: '1.13',
        desc: 'Funky path town. This season focused a lot on shops at spawn.',
        members: ['Dark', 'Block', 'Smilee', 'HillbillyDeluex', 'Pudding', 'ColdParasite', 'TheFull98', 'Kiwi', 'Debesk', 'Deadspace', 'Hyperinsomniac', 'John', 'Foxtrott', 'PottsGames'],
        pics: genSeasonPics(5, 32, 'avif'), // season 5 | 32 pics in gallery
    },
    {
        name: 'Vanilla Season 6',
        tagName: 'vanS6',
        date: 'Date unknown',
        version: '1.14',
        desc: 'Baby sitter season. Tons of drama. Unique bases.',
        members: ['Dark', 'Block', 'Smilee', 'Pudding', 'HillbillyDeluex', 'Gamrpanda', 'RiiskyPlaysMC', 'JTParent', 'FoundMissing', 'SquidDweller', 'YungJoke', 'Syncro', 'QuestFinder'],
        pics: genSeasonPics(6, 7, 'avif'), // season 6 | 7 pics in gallery
    },
    {
        name: 'Cobblemon Season 1',
        tagName: 'cobS1',
        date: '(Jan 2025 - May 2025)',
        version: 'Minecraft: 1.21.1 | Neo-forge',
        desc: 'Mindstorms back from its hiatus. Our first modded season. Tons of new members joined. Jmanns pokeball loomed over the lands.<br><br>Mindstorm Cobblemon open #1<br><br>1st place: <span class="yellow">theJman12</span><br>2nd place: <span class="yellow">Sam_16_</span><br>3rd place: <span class="yellow">Hillbillydeluex</span>',
        members: [  "Outlawe","TopTierQueer","HillbillyDeluex","MagicallyATurtle","Stealthypigeon","Simon010503","ohmygodspeed","Stalinato","BigPimpin190","Blockk","TiltCam","Sei74","itsbunter","RandieCLVR",
                    "Sandor_RAI","RaginSapp","leshenkana","BoelBrown","iPhantom_xD","Ivy_Young","Metalina","Syrrmaa","sluglyss","DARKminerKS","Rune32","trooperx4","bagelcrispp",
                    "qwaum","Lexi5536","EnglishSpoon","IPheI","theJman12","Luna_Leit","TheShadowRang658","Strontium38","geobobeebo","Sam_16_","CyberrGoblin","lx0525"],
        pics: genSeasonPics('cobblemon_1', 29, 'png'), // cobblemon season 1 | 29 pics in gallery//siteImages.placeHolder, //genSeasonPics(?, ?), 
    },
    {
        name: 'Cobblemon Season 2',
        tagName: 'cobS2',
        date: '(Nov 2025 - Dec 2025)',
        version: 'Minecraft: 1.21.1 | Neo-forge',
        desc: 'The christmas season. The shortest season in Mindstorm history.',
        members: [  "Outlawe", "LordCozzworth","HillbillyDeluex","Syrmaa_","XVI_Legion","KitsuneNoKiubbi","Hunkanator","Blockk","CraftyMessiah","lemoffline","Plu6625","PinkRandie",
                    "CleverFoal11555","GreeeeenThunder","Wash_Killson","Sandor_RAI","_Kitri","Ketshupflasche","_Yes_Sir","SuitFellow","Raccoonaphobic","ChiroRoy","Kyrolol","DARKminerKS","Lexi5536","theJman12","IPheI",
                    "TheShadowRang658","Strontium38","Sam_16_","CyberrGoblin","K_FBI" ],
        pics: genSeasonPics('cobblemon_2', 6, 'png'), //pics: siteImages.placeHolder, //genSeasonPics(?, ?), 
    },
]

// function to generate the season pic image arrays
// each array will be added to the appropriate image 
// season array = season image
///////////////////////////////////////////
///                                     ///
///      SEASONS PICTURES GENERATOR     ///
///                                     ///
///////////////////////////////////////////
function genSeasonPics(seasonNumber, imgCount, imgType) { // use the season number, then amount of images in file
    //console.log(`generating season ${seasonNumber} image arrays`)
    // returns arrays for each page
    return Array.from({ length: imgCount }, (_, i) =>
        `images/season_${seasonNumber}/season${seasonNumber}_${i + 1}.${imgType}`
    );
}
