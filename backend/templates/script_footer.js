/////////////////////////////////////////////////
///                                           ///
///       FOOTER GENERATOR SCRIPT PAGE        ///
///                                           ///
/////////////////////////////////////////////////

import { siteVariables } from './script_variables.js';

// ALL IMPORTS 

//-----------------------------------------------------------------//

// fills the footer of the page
export function fillFooter() {

  // declaring variables
  let p;

  // the footer
  const footer = document.querySelector('footer');

  // create the text element
  p = document.createElement('p');
  p.textContent = siteVariables.footer.message;

  // append the footer text to the footer
  footer.appendChild(p);

}