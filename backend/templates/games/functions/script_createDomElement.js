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

const variables = {

}

/////////////////////////////////////////////////
///                                           ///
///           BUTTON CREATION SCRIPT          ///
///                                           ///
/////////////////////////////////////////////////
//
//  const testBtn = createButton(true, 'test', 'test', test());
//
export function createButton(disabled, visible, text, classes, IDname, listener) {

  // CREATE THE BUTTON ELEMENT
  const button = document.createElement('button');

  // IF THE BUTTON IS TO BE DISABLED
  if (disabled) button.disabled = true;
  else button.disabled = false;

  if (!visible) button.style.display = 'none';

  // IF TEXT IS WANTED
  if (text) button.textContent = text;

  // IF THE BUTTON HAS CLASSES
  if (classes) button.classList = classes;

  // IF THE BUTTON HAS AN ID NAME
  if (IDname) button.id = IDname;

  // IF THE BUTTON NEEDS AN EVENT LISTENER
  if (listener) {

    // ADD THE FUNCTION TO THE BUTTON
    button.addEventListener('click', listener);

  }

  // RETURN THE BUTTON
  return button;

}

/////////////////////////////////////////////////
///                                           ///
///           INPUT CREATION SCRIPT           ///
///                                           ///
/////////////////////////////////////////////////
export function createInput(disabled, visible, type, text, classes, IDname, listener) {

  // CREATE THE INPUT ELEMENT
  const input = document.createElement('input');

  // IF THE INPUT IS TO BE DISABLED
  if (disabled) input.disabled = true;
  else input.disabled = false;

  // IF THE INPUT IS VISIBLE
  if (!visible) input.style.display = 'none';

  // THE TYPE OF INPUT
  if (type) input.type = type;

  // IF TEXT IS WANTED
  if (text) input.placeholder = text;

  // IF THE INPUT HAS CLASSES
  if (classes) input.classList = classes;

  // IF THE INPUT HAS AN ID NAME
  if (IDname) input.id = IDname;

  // IF THE INPUT NEEDS AN EVENT LISTENER
  if (listener) {

    // ADD THE FUNCTION TO THE INPUT
    input.addEventListener('click', listener);

  }

  // RETURN THE INPUT
  return input;
}