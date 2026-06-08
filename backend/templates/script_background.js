/////////////////////////////////////////////////
///                                           ///
///          BACKGROUND SCRIPT PAGE           ///
///                                           ///
/////////////////////////////////////////////////

// ALL IMPORTS 

import { siteImages, siteVariables } from './script_variables.js';

//-----------------------------------------------------------------//

// used for the background image rotator
const backgroundIndex = {};
let topLayer = 1; // track which div is currently on top

// This function works globally, just plug whatever (page) your loading into function
// This changes the background image every 10 seconds
// Each background has its own set of images. Images are located in variables.js
export function backgroundSlideshow(page) {
  const images = siteImages[page];
  if (!images || images.length === 0) return;

  // initialize index
  if (backgroundIndex[page] === undefined) {
      backgroundIndex[page] = 0;
  }

  // creates a static index of the images being loaded
  // leps the images loaded 
  const index     = backgroundIndex[page];
  const nextIndex = (index + 1) % images.length;

  // the background elements to change
  const bg1 = document.getElementById('page_bcg_1');
  const bg2 = document.getElementById('page_bcg_2');

  // fail check
  if (!bg1 || !bg2) return;

  // On first run, make sure at least one layer shows the initial image
  // This helps eliminate the flashing I was experiencing
  if (!bg1.style.backgroundImage && !bg2.style.backgroundImage) {
      bg1.style.backgroundImage = `url('${images[index]}')`;
      bg1.style.opacity = '1';
      bg2.style.opacity = '0';

      // schedule next slide
      setTimeout(() => backgroundSlideshow(page), siteVariables.background_refresh); // pulled from variables
      return;
  }

  // figure out which is on top currently
  // aka which once is currently visible
  const top = topLayer === 1 ? bg1 : bg2;
  const bottom = topLayer === 1 ? bg2 : bg1;

  // set next image on hidden layer
  bottom.style.backgroundImage = `url('${images[nextIndex]}')`;

  // fade bottom in, top out
  bottom.style.opacity = 1;
  top.style.opacity = 0;

  // swap which layer is on top
  topLayer = topLayer === 1 ? 2 : 1;

  // advance index
  backgroundIndex[page] = nextIndex;

  // schedule next slide
  setTimeout(() => backgroundSlideshow(page), siteVariables.background_refresh); // pulled from variables
}