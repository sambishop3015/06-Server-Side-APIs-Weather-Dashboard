//Make sure the html is loaded before running script
$(document).ready(function () {

  var lat;
  var lon;

  //Current Day Date/Time
  const m = moment();
  let dateDisplay = m.format('M/D/YYYY');

  //1 Day Forecast Date
  const m1 = moment().add(1, 'day');
  let datePlus1 = m1.format('M/D');

  //2 Day Forecast Date
  const m2 = moment().add(2, 'day');
  let datePlus2 = m2.format('M/D');

  //3 Day Forecast Date
  const m3 = moment().add(3, 'day');
  let datePlus3 = m3.format('M/D');

  //4 Day Forecast Date
  const m4 = moment().add(4, 'day');
  let datePlus4 = m4.format('M/D');

  //5 Day Forecast Date
  const m5 = moment().add(5, 'day');
  let datePlus5 = m5.format('M/D');


  var loadSearch;

  var searchList = JSON.parse(localStorage.getItem('previousSearchListItem')) || []


  // Page Load Funtion -------------------------------------------------------
  function pageLoad() {
    loadSearch = localStorage.getItem('lastSearch');
    console.log('load search: ' + loadSearch);
    searchWeather();
  }
  pageLoad();

  // Search Button Action ----------------------------------------------------
  
  // Enter Key in Search Field
  $('#searchQuery').keydown(function (event) {
    if (event.keyCode === 13) {
      getValue();
    }
  })
  
  // Search Button Click 
  $('#search-button').click(function () {
    getValue();
  });

  function getValue() {
    var searchText = $('#searchQuery').val();
    loadSearch = searchText;
    console.log('new load search: ' + loadSearch);
    localStorage.setItem('lastSearch', searchText)
    searchWeather();
  };

  // Previous Searched List Click Event
  $('p').click(function () {
    // var city = $('#city-grab').attr('class');
    console.log('clicked');
  })

  // Search Weather -----------------------------------------------------------
  function searchWeather() {
    var queryURL1 = "http://api.openweathermap.org/data/2.5/weather?q=" + loadSearch + "&appid=0d23ce5bcc2e4f505cf7ec85adf351ab";
    $.ajax({
      url: queryURL1,
      method: "GET"
    }).then(function (response) {
      var temperature1 = (((response.main.temp) - 273.15) * 1.8 + 32);
      var str1 = temperature1.toString();
      var str2 = str1.substring(0, str1.lastIndexOf('.') + 3);
      var temperature2 = parseFloat(str2).toFixed(2)
      $('#temp').text('Temperature: ' + temperature2 + ' °F');
      $('#hum').text('Humidity: ' + response.main.humidity + '%');
      $('#wind').text('Wind Speed: ' + response.wind.speed + ' MPH');
      $('#searched-city').html(`${response.name} (${dateDisplay})<img id="wicon" ${iconurl}>`);
      lat = (response.coord.lat);
      lon = (response.coord.lon);

      var mainIconCode = response.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + mainIconCode + ".png";
      $('#wicon').attr('src', iconurl);

      var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=0d23ce5bcc2e4f505cf7ec85adf351ab";
      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        var uvi = response.current.uvi
        $('#uv').html(`UV index: <span id="uvVal">${uvi}</span>`);
        if (uvi > 0 && uvi < 3) {
          $('#uvVal').addClass('uvGreen');
        } else if (uvi > 3 && uvi < 6) {
          $('#uvVal').addClass('uvYellow');
        } else if (uvi > 6 && uvi < 8) {
          $('#uvVal').addClass('uvOrange');
        } else if (uvi > 8 && uvi < 10) {
          $('#uvVal').addClass('uvRed');
        }

        prependSearch();
      })

      var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + loadSearch + "&appid=0d23ce5bcc2e4f505cf7ec85adf351ab";
      $.ajax({
        url: queryURL3,
        method: "GET"
      }).then(function (response) {

        // DAY 1 FORECAST
        // Date
        $('#date1').text(datePlus1)

        // Icon
        var iconCode1 = response.list[7].weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconCode1 + ".png";
        $('#icon1').attr('src', iconurl);

        // Temperature
        var temperatureDayOne1 = (((response.list[7].main.temp) - 273.15) * 1.8 + 32)
        var str1 = temperatureDayOne1.toString();
        var str2 = str1.substring(0, str1.lastIndexOf('.') + 3);
        var temperatureDayOne2 = parseFloat(str2).toFixed(2)
        $('#temp1').text('T: ' + temperatureDayOne2 + ' °F');

        // Humidity
        $('#hum1').text('H: ' + response.list[7].main.humidity + '%')


        // DAY 2 FORECAST
        // Date
        $('#date2').text(datePlus2)

        // Icon
        var iconCode2 = response.list[14].weather[0].icon;
        var iconurl2 = "http://openweathermap.org/img/w/" + iconCode2 + ".png";
        $('#icon2').attr('src', iconurl2);

        // Temperature
        var temperatureDayTwo1 = (((response.list[14].main.temp) - 273.15) * 1.8 + 32)
        var str1 = temperatureDayTwo1.toString();
        var str2 = str1.substring(0, str1.lastIndexOf('.') + 3);
        var temperatureDayTwo2 = parseFloat(str2).toFixed(2)
        $('#temp2').text('T: ' + temperatureDayTwo2 + ' °F');

        // Humidity
        $('#hum2').text('H: ' + response.list[14].main.humidity + '%')

        // DAY 3 FORECAST
        // Date
        $('#date3').text(datePlus3)

        // Icon
        var iconCode3 = response.list[21].weather[0].icon;
        var iconurl3 = "http://openweathermap.org/img/w/" + iconCode3 + ".png";
        $('#icon3').attr('src', iconurl3);

        // Temperature
        var temperatureDayThree1 = (((response.list[21].main.temp) - 273.15) * 1.8 + 32)
        var str1 = temperatureDayThree1.toString();
        var str2 = str1.substring(0, str1.lastIndexOf('.') + 3);
        var temperatureDayThree2 = parseFloat(str2).toFixed(2)
        $('#temp3').text('T: ' + temperatureDayThree2 + ' °F');

        // Humidity
        $('#hum3').text('H: ' + response.list[21].main.humidity + '%')

        // DAY 4 FORECAST
        // Date
        $('#date4').text(datePlus4)

        // Icon
        var iconCode4 = response.list[28].weather[0].icon;
        var iconurl4 = "http://openweathermap.org/img/w/" + iconCode4 + ".png";
        $('#icon4').attr('src', iconurl4);

        // Temperature
        var temperatureDayFour1 = (((response.list[28].main.temp) - 273.15) * 1.8 + 32)
        var str1 = temperatureDayFour1.toString();
        var str2 = str1.substring(0, str1.lastIndexOf('.') + 3);
        var temperatureDayFour2 = parseFloat(str2).toFixed(2)
        $('#temp4').text('T: ' + temperatureDayFour2 + ' °F');

        // Humidity
        $('#hum4').text('H: ' + response.list[28].main.humidity + '%')

        // DAY 5 FORECAST
        // Date
        $('#date5').text(datePlus5)

        // Icon
        var iconCode5 = response.list[35].weather[0].icon;
        var iconurl5 = "http://openweathermap.org/img/w/" + iconCode5 + ".png";
        $('#icon5').attr('src', iconurl5);

        // Temperature
        var temperatureDayFive1 = (((response.list[35].main.temp) - 273.15) * 1.8 + 32)
        var str1 = temperatureDayFive1.toString();
        var str2 = str1.substring(0, str1.lastIndexOf('.') + 3);
        var temperatureDayFive2 = parseFloat(str2).toFixed(2)
        $('#temp5').text('T: ' + temperatureDayFive2 + ' °F');

        // Humidity
        $('#hum5').text('H: ' + response.list[35].main.humidity + '%')
      })
    })
  }

  // Prepend Search City to List ---------------------------------------------
  function prependSearch() {
    var cityClass = (($('#city-grab').attr('class')));
    var searchText = $('#searchQuery').val();

    //if the searchText is not existed in the array, then push into searchList
    searchList.push(searchText)
    localStorage.setItem('previousSearchListItem', JSON.stringify(searchList));

    //console.log('previousSearchListItem: ' + searchList);
    display()
  }

  function display() {
    $('#past-searches').empty();
    for (let i = 0; i < searchList.length; i++) {
      const element = searchList[i];
      var previousSearch = $('<p id="city-grab">' + element + '</p>');
      $(previousSearch).addClass(element);
      $('#past-searches').prepend(previousSearch);
      $('#searchQuery').val('');
    }
  }
  // Previous Search Click Not Working ----------------------------------------
  $('.previousSearchListItem').click(function () {
    console.log('previous search list item clicked!')
  })

  display();
})