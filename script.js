//Make sure the html is loaded before running script
$(document).ready(function() {

    var city = detroit;
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0d23ce5bcc2e4f505cf7ec85adf351ab";
    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log(response.Runtime);
    });










})