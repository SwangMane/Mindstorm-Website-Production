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

/////////////////////////////////////////////////
///                                           ///
///           HIDE DOM OBJ SCRIPT             ///
///                                           ///
/////////////////////////////////////////////////
export function hideShowDomObj(hide, show, objID, objClass, displayStlye) {

  if (hide) {

    if (objID) {

      const object = document.querySelector(`#${objID}`);
      object.style.display = 'none';

    }

    if (objClass) {

      document.querySelectorAll(`.${objClass}`).forEach(object => {
        object.style.display = 'none';
      })
      
    }
  }

  if (show) {
    if (objID) {

      if (displayStlye) {
        const object = document.querySelector(`#${objID}`);
        object.style.display = `${displayStlye}`;        
      }
      else {
        const object = document.querySelector(`#${objID}`);
        object.style.display = 'block';
      }
    }

    if (objClass) {
      if (displayStlye) {
        const object = document.querySelector(`.${objClass}`);
        object.style.display = displayStlye;        
      }
      else {
        const object = document.querySelector(`.${objClass}`);
        object.style.display = 'block';
      }
    }    
  }
}