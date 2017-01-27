var countries;

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
  console.log(countries);
  getCapital();
};

var getCapital = function(){
  // var div = document.querySelector('#display-capital');
  var capitals = [];
  countries.forEach(function(country){
    capitals.push(country.capital);
  });
  console.log(capitals);
}

var app = function(){
  var url = 'https://restcountries.eu/rest/v1/all';
  makeRequest(url, requestComplete);
}

window.onload = app;
