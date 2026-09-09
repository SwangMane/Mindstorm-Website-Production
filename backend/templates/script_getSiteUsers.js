///////////////////////////////////////////
///                                     ///
///             ALL IMPORTS             ///
///                                     ///
///////////////////////////////////////////

import { siteVariables } from './script_variables.js';

///////////////////////////////////////////
///                                     ///
///        ALL LOCAL VARIABLES          ///
///                                     ///
///////////////////////////////////////////

///////////////////////////////////////////
///                                     ///
///   GET ALL SITE USERS FROM BACKEND   ///
///                                     ///
///////////////////////////////////////////
export async function getSiteUsers() {
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