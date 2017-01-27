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
  // console.log(capitals);
};

var displayCapital = function(){
  var div = document.querySelector('#display-capital');
  var limit = capitals.length;
  var index = getRandomNumber(limit);
  div.innerHTML = capitals[index];
};

var getRandomNumber = function(max) {
    min = 0;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1));
  };




var app = function(){
  var url = 'https://restcountries.eu/rest/v1/all';
  makeRequest(url, requestComplete);

  var button = document.querySelector('#get-capital');
  button.onclick = displayCapital;
};

window.onload = app;
