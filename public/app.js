var countries;
var capitals = [];

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
  // console.log(countries);
  populateCapitals();
  displayCapital();
};

var populateCapitals = function(){
  countries.forEach(function(country){
    capitals.push(country.capital);
  });
  // console.log(capitals);
};

var displayCapital = function(){
  var div = document.querySelector('#display-capital');
  var limit = capitals.length;
  var index = getRandomNumber(limit);
  div.innerHTML = capitals[index];
}
  function getRandomNumber(max) {
    min = 0;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


var app = function(){
  var url = 'https://restcountries.eu/rest/v1/all';
  makeRequest(url, requestComplete);
};

window.onload = app;
