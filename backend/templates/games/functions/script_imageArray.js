///////////////////////////////////////////
///                                     ///
///             ALL IMPORTS             ///
///                                     ///
///////////////////////////////////////////



///////////////////////////////////////////
///                                     ///
///        ALL LOCAL VARIABLES          ///
///                                     ///
///////////////////////////////////////////



///////////////////////////////////////////
///                                     ///
///          IMAGE PRE-LOADER           ///
///                                     ///
///////////////////////////////////////////
// 
//  # PRELOADS ALL GIVEN IMAGES INTO USERS BROWSER
//  # THIS IS TO PREVENT IMAGES LOADING ON REQUES
//
export async function preloadImages(urls, name, count) {
    return Promise.all(
        urls.map(url => new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = resolve;
            img.onerror = reject;
            img.src = url;

            console.log('Finished loading ' + count + ' images: ' + name);
        }))
    );
}