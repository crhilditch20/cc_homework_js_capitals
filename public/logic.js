var countries;
var capitals = [];
var currentCapital;
var guessedCountry;

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = callback;
  request.send();
};

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText; 
  countries = JSON.parse(jsonString);
  populateList(countries);
  populateCapitals();
};

var populateList = function(countries){
  var select = document.querySelector('#country-list');
    countries.forEach(function(country){
      var option = document.createElement('option'); 
        option.innerText = country.name; 
        option.value = country.name;
      select.appendChild(option); 
    });
};

var populateCapitals = function(){
  countries.forEach(function(country){
    capitals.push(country.capital);
  });
};

var displayCapital = function(){
    clearPrevious();
  var div = document.querySelector('#display-capital');
  var limit = capitals.length;
  var index = getRandomNumber(limit);
    currentCapital = capitals[index];
    div.innerHTML = currentCapital;
};

var getRandomNumber = function(max) {
    min = 0;
    max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1));
  };

var countryGuess = function(){
  var select = document.querySelector('#country-list');
  var div = document.querySelector('#guess-result');
  var userGuess = this.value;
  guessedCountry = getCountryObject(userGuess);
    if(currentCapital === guessedCountry.capital){
      div.innerHTML = "Correct! Here are some fun facts about " + guessedCountry.name;
        getCountryData(guessedCountry);
      var hiddenButton = document.querySelector('#take-me-there');
      hiddenButton.style.visibility = 'visible';
        displayCountryMap(guessedCountry);
    } else {
      div.innerHTML = "Naw, guess again";
    }
};

var getCountryObject = function (value) {
  for(var country of countries){
    if(country.name === value){
      var countryObject = country;
    }
  } return countryObject;
};

var getCountryData = function(countryObject){
  var div = document.querySelector('#fun-facts');
  var list = document.createElement('ul');
    list.className = 'text';
      var population = document.createElement('li');
        population.className = 'text';
        population.innerHTML = "Population: " + countryObject.population;
      var region = document.createElement('li');
        region.className = 'text';
        region.innerHTML = "Region: " + countryObject.region;
      var subregion = document.createElement('li');
        subregion.className = 'text';
        subregion.innerHTML = "Sub-region: " + countryObject.subregion;
    list.appendChild(population);
    list.appendChild(region);
    list.appendChild(subregion);
  div.appendChild(list);
};

var clearPrevious = function(){
  var previous = document.querySelector('#guess-result');
  var funfacts = document.querySelector('#fun-facts');
  var hiddenButton = document.querySelector('#take-me-there');
  var hiddenMap = document.querySelector('#map');
    previous.innerHTML = '';
    funfacts.innerHTML = '';
    hiddenButton.style.visibility = 'hidden';
    hiddenMap.style.visibility = 'hidden';
};

var getCoords = function(countryObject){
 var coords = {lat: countryObject.latlng[0], lng: countryObject.latlng[1]};
    return coords;
};

var makeMap = function(coords){
  var mapDiv = document.querySelector('#map');
  var map = new MapWrapper(mapDiv, coords, 6);
};

var displayCountryMap = function(countryObject){
  makeMap(getCoords(countryObject));
};

var unhideMap = function(){
  var hiddenMap = document.querySelector('#map');
    hiddenMap.style.visibility = 'visible';
};

