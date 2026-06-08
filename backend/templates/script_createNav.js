
/////////////////////////////////////////////////
///                                           ///
///       NAV BAR GENERATOR SCRIPT PAGE       ///
///                                           ///
/////////////////////////////////////////////////

// ALL IMPORTS 

//-----------------------------------------------------------------//

// used to create a nav item for a specific nav area
export const generateNavItem = (item, isActive = false) => { // link | class (active, classname) | title
    return `
        <li class="${item.liClass || ''}">
            <a href="${item.link}" class="${isActive ? 'active_link' : ''} ${item.class || ''}" title="${item.title}">
                ${item.title}
            </a>
        </li>
    `;
}