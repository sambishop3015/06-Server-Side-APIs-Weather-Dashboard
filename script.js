//Make sure the html is loaded before running script
$(document).ready(function() {

  var lat;
  var lon;
  
  //Current Day
  const m = moment();
  let dateDisplay = m.format('M/D/YYYY');
  
  //1 Day Forecast
  const m1 = moment().add(1, 'day');
  let datePlus1 = m1.format('M/D/YYYY');

  //2 Day Forecast
  const m2 = moment().add(2, 'day');
  let datePlus2 = m2.format('M/D/YYYY');

  //3 Day Forecast
  const m3 = moment().add(3, 'day');
  let datePlus3 = m3.format('M/D/YYYY');

  //4 Day Forecast
  const m4 = moment().add(4, 'day');
  let datePlus4 = m4.format('M/D/YYYY');

  //5 Day Forecast
  const m5 = moment().add(5, 'day');
  let datePlus5 = m5.format('M/D/YYYY');


  $('#search-button').click(function(){
    var queryURL1 = "http://api.openweathermap.org/data/2.5/weather?q=" + $('#searchQuery').val() + "&appid=0d23ce5bcc2e4f505cf7ec85adf351ab";
  $.ajax({
    url: queryURL1,
    method: "GET"
  }).then(function(response) {
    //console.log(response);
    var temperature1 = (((response.main.temp)-273.15)*1.8+32);
    var str1 = temperature1.toString();
    var str2 = str1.substring(0,str1.lastIndexOf('.')+3);
    var temperature2 = parseFloat(str2).toFixed(2)
    $('#temp').text('Temperature: ' + temperature2 + ' °F');
    $('#hum').text('Humidity: ' + response.main.humidity + '%');
    $('#wind').text('Wind Speed: ' + response.wind.speed + ' MPH');
    //console.log(dt);
    $('#searched-city').text(response.name + ' ' + '(' + dateDisplay + ')');
    lat = (response.coord.lat);
    lon = (response.coord.lon);

    var mainIconCode = response.weather[0].icon;
    //console.log(mainIconCode);
    var iconurl = "http://openweathermap.org/img/w/" + mainIconCode + ".png";
    $('#wicon').attr('src', iconurl);

    prependSearch();
    



    var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&exclude=hourly,daily&appid=0d23ce5bcc2e4f505cf7ec85adf351ab";
  $.ajax({
    url: queryURL2,
    method: "GET"
  }).then(function(response) {
    //console.log(response);
    var uvi = response.current.uvi
    $('#uv').text('UV index: ' + uvi)
      if (uvi > 0 && uvi < 3) {
        $('#uv').addClass('uvGreen');
      } else if (uvi > 3 && uvi < 6) {
        $('#uv').addClass('uvYellow');
      } else if (uvi > 6 && uvi < 8) {
        $('#uv').addClass('uvOrange');
      } else if (uvi > 8 && uvi < 10) {
        $('#uv').addClass('uvRed');
      }
  })
  

  //------------------START HERE ON 5 DAY ICONS------------------------------------------------
  var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + $('#searchQuery').val() + "&appid=0d23ce5bcc2e4f505cf7ec85adf351ab";
  $.ajax({
    url: queryURL3,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    //-- Day 1 Forecast --------------------------------------------------
    // Date
    $('#date1').text(datePlus1)

    // Icon
    var iconCode1 = response.list[7].weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconCode1 + ".png";
    $('#icon1').attr('src', iconurl);
    
    // Temperature
    var temperatureDayOne1 = (((response.list[7].main.temp)-273.15)*1.8+32)
    var str1 = temperatureDayOne1.toString();
    var str2 = str1.substring(0,str1.lastIndexOf('.')+3);
    var temperatureDayOne2 = parseFloat(str2).toFixed(2)
    $('#temp1').text('Temp: ' + temperatureDayOne2 + ' °F');

    // Humidity
    $('#hum1').text('Humidity: ' + response.list[7].main.humidity + '%')
  
  
    //-- Day 2 Forecast --------------------------------------------------
    // Date
    $('#date2').text(datePlus2)

    // Icon
    var iconCode2 = response.list[14].weather[0].icon;
    var iconurl2 = "http://openweathermap.org/img/w/" + iconCode2 + ".png";
    $('#icon2').attr('src', iconurl2);

    // Temperature
    var temperatureDayTwo1 = (((response.list[14].main.temp)-273.15)*1.8+32)
    var str1 = temperatureDayTwo1.toString();
    var str2 = str1.substring(0,str1.lastIndexOf('.')+3);
    var temperatureDayTwo2 = parseFloat(str2).toFixed(2)
    $('#temp2').text('Temp: ' + temperatureDayTwo2 + ' °F');

    // Humidity
    $('#hum2').text('Humidity: ' + response.list[14].main.humidity + '%')
  
    //-- Day 3 Forecast --------------------------------------------------
    // Date
    $('#date3').text(datePlus3)

    // Icon
    var iconCode3 = response.list[21].weather[0].icon;
    var iconurl3 = "http://openweathermap.org/img/w/" + iconCode3 + ".png";
    $('#icon3').attr('src', iconurl3);

    // Temperature
    var temperatureDayThree1 = (((response.list[21].main.temp)-273.15)*1.8+32)
    var str1 = temperatureDayThree1.toString();
    var str2 = str1.substring(0,str1.lastIndexOf('.')+3);
    var temperatureDayThree2 = parseFloat(str2).toFixed(2)
    $('#temp3').text('Temp: ' + temperatureDayThree2 + ' °F');

    // Humidity
    $('#hum3').text('Humidity: ' + response.list[21].main.humidity + '%')

    //-- Day 4 Forecast --------------------------------------------------
    // Date
    $('#date4').text(datePlus4)

    // Icon
    var iconCode4 = response.list[28].weather[0].icon;
    var iconurl4 = "http://openweathermap.org/img/w/" + iconCode4 + ".png";
    $('#icon4').attr('src', iconurl4);

    // Temperature
    var temperatureDayFour1 = (((response.list[28].main.temp)-273.15)*1.8+32)
    var str1 = temperatureDayFour1.toString();
    var str2 = str1.substring(0,str1.lastIndexOf('.')+3);
    var temperatureDayFour2 = parseFloat(str2).toFixed(2)
    $('#temp4').text('Temp: ' + temperatureDayFour2 + ' °F');

    // Humidity
    $('#hum4').text('Humidity: ' + response.list[28].main.humidity + '%')

    //-- Day 5 Forecast --------------------------------------------------
    // Date
    $('#date5').text(datePlus5)

    // Icon
    var iconCode5 = response.list[35].weather[0].icon;
    var iconurl5 = "http://openweathermap.org/img/w/" + iconCode5 + ".png";
    $('#icon5').attr('src', iconurl5);

    // Temperature
    var temperatureDayFive1 = (((response.list[35].main.temp)-273.15)*1.8+32)
    var str1 = temperatureDayFive1.toString();
    var str2 = str1.substring(0,str1.lastIndexOf('.')+3);
    var temperatureDayFive2 = parseFloat(str2).toFixed(2)
    $('#temp5').text('Temp: ' + temperatureDayFive2 + ' °F');

    // Humidity
    $('#hum5').text('Humidity: ' + response.list[35].main.humidity + '%')
})
})
});








function prependSearch() {
  var searchText = $('#searchQuery').val();
  var previousSearch = $('<p>' + searchText + '</p>');
  $(previousSearch).addClass('previousSearchListItem');
  $('#past-searches').prepend(previousSearch);
}


$('.previousSearchListItem').click(function(){
  console.log('previous search list item clicked!')
})








})

