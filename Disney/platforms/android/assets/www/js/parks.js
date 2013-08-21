function changePg() {
  window.sessionStorage.setItem('park', park);
  $.mobile.changePage("/html/attractionList.html",{ reloadPage : true });
}
function getHref(aElem, park) {
    //set the selected park in the session
    window.sessionStorage.setItem('park', park);
    aElem.href = "/html/attractionList.html";
}