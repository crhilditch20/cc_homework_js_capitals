var app = function(){
  var hiddenMap = document.querySelector('#map');
  hiddenMap.style.visibility = 'hidden';

  var hiddenButton = document.querySelector('#take-me-there');
  hiddenButton.style.visibility = 'hidden';

  var url = 'https://restcountries.eu/rest/v1/all';
  makeRequest(url, requestComplete);

  var button = document.querySelector('#get-capital');
  button.onclick = displayCapital;

  var select = document.querySelector('#country-list');
  select.onchange = countryGuess;

  hiddenButton.onclick = unhideMap;

};

window.onload = app;