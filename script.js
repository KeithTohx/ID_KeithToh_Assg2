// lists to store Traffic and Rainfall markers
let markersArrayTraf = [];
let markersArrayRain = [];

function initMap() {
  // map options
  var options = {
    center: {lat: 1.3656, lng: 103.8530},
    zoom: 11
  };
  // new map
  var map = new google.maps.Map(document.getElementById('map'), options);

  // User current location (from Google Maps Platform Documentation)
  infoWindowUser = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindowUser.setPosition(pos);
          infoWindowUser.setContent("<p style='font-size: 16px; margin-bottom: 0%;'><b>Your Current Location</b>");
          map.setCenter(pos);
          // create user marker on map
          var markerUser = new google.maps.Marker({
            position: pos,
            animation:google.maps.Animation.DROP,
            map: map
          });
          markerUser.addListener('click', function(){
            infoWindowUser.open(map, markerUser);
          });
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });

  // SG TRAFFIC IMAGES
  // Adds a marker to the map and push to the array
  function addMarkerTraf(props){
    var markerTraf = new google.maps.Marker({
      position: props.coords,
      map: map
    });
    markersArrayTraf.push(markerTraf);

    // check for custom icon
    if (props.iconImageTraf){
      markerTraf.setIcon(props.iconImageTraf);
    }

    // check content
    if (props.content){
      let infoWindowTraf = new google.maps.InfoWindow({
        content: props.content
      });
    
      markerTraf.addListener('click', function(){
        infoWindowTraf.open(map, markerTraf);
      });
    }
  }

  // sets the map on all markers in the array
  function setMapOnAllTraf(map) {
    for (let i = 0; i < markersArrayTraf.length; i++) {
      markersArrayTraf[i].setMap(map);
    }
  }

  // deletes all markers in the array by removing references to them
  function deleteMarkersTraf() {
    setMapOnAllTraf(null);
    markersArrayTraf = [];
  }

  // TRAFFIC API SECTION
  let searchTraf = document.getElementById('searchTraf');
  searchTraf.addEventListener('click', function() {
    var input_date = document.getElementById('dateTraf').value;

    $(document).ready(function(updatedata) {
      var params = {
        // YYYY-MM-DD[T]HH:mm:ss (SGT)
        "date_time": input_date
        };
      
        $.ajax({
        type: "GET",
        dataType: 'json',
        contentType: "text/plain",
        url: "https://api.data.gov.sg/v1/transport/traffic-images",
        headers: {
      
        },
      
        data: { "date_time": input_date },
        success: function(data) {
          // user enter date time in correct format
          if ((data.items[0].cameras) == undefined)
          {
            // display error message when no traffic data found
            alert("You have entered a future DateTime. \nNo traffic details were found. \nPlease try another Date & Time.");
          }
          else {
            for (var i=0; i<(data.items[0].cameras).length; i++)
            {
              var camId = data.items[0].cameras[i].camera_id;
              var datalatTraf = data.items[0].cameras[i].location.latitude;
              var datalngTraf = data.items[0].cameras[i].location.longitude;
              var dataTSTraf = new Date(data.items[0].cameras[i].timestamp);
              var image = data.items[0].cameras[i].image;

              // traffic info window content 
              var contentStringTraf =
              `<div id="content">
              <div id="siteNotice">
              </div>
              <div id="bodyContent">
              <p><b>Traffic</b></p>
              <p style='font-size: 14px;'>Camera ID:  ${camId}</p>
              <p style='font-size: 14px;'>Latitude: ${datalatTraf}</p>
              <p style='font-size: 14px;'>Longitude: ${datalngTraf}</p>
              <p style='font-size: 14px;'>Time Stamp: ${dataTSTraf}</p>
              <img src='${image}' class='img-fluid traffic_img' style='width: 320'>
              </div>
              </div>`;

              // call function to add marker on map
              addMarkerTraf({
                coords:{lat: datalatTraf, lng: datalngTraf},
                iconImageTraf: 'images/camera.png',
                content: contentStringTraf
              });
            }
          }
        },
        // if input is incorrect (wrong format)
        error: function(data) {
          alert("Invalid datetime format \nCorrect format: YYYY-MM-DD[T]HH:mm:ss \n(e.g.: 2020-12-31T23:59:59)");
        }
        });
    });
  }, false);

  // removes traffic details
  $('#emtpyTraf').click(function(){
    deleteMarkersTraf();
  });

  // SG WEATHER - RAINFALL
  // Adds a marker to the map and push to the array
  function addMarkerRain(props){
    var markerRain = new google.maps.Marker({
      position: props.coords,
      map: map
    });
    markersArrayRain.push(markerRain);

    // check for custom icon
    if (props.iconImageRain){
      markerRain.setIcon(props.iconImageRain);
    }

    // check content
    if (props.content){
      let infoWindowRain = new google.maps.InfoWindow({
        content: props.content
      });
    
      markerRain.addListener('click', function(){
        infoWindowRain.open(map, markerRain);
      });
    }
  }

  // sets the map on all markers in the array
  function setMapOnAllRain(map) {
    for (let i = 0; i < markersArrayRain.length; i++) {
      markersArrayRain[i].setMap(map);
    }
  }

  // deletes all markers in the array by removing references to them
  function deleteMarkersRain() {
    setMapOnAllRain(null);
    markersArrayTraf = [];
  }

  // WEATHER API SECTION
  let searchRain = document.getElementById('searchRain');
  searchRain.addEventListener('click', function() {
    var input_date = document.getElementById('dateRain').value;

    $(document).ready(function(updatedata) {
      var params = {
        // YYYY-MM-DD[T]HH:mm:ss (SGT)
        "date_time": input_date
        };
      
        $.ajax({
        type: "GET",
        dataType: 'json',
        contentType: "text/plain",
        url: "https://api.data.gov.sg/v1/environment/rainfall",
        headers: {
      
        },
      
        data: { "date_time": input_date },
        success: function(data) {
          // user enter date time in correct format
          if (data.items[0].timestamp==""){
            // display error message when no weather data found
            alert("You have entered a future DateTime. \nNo rainfall values were found. \nPlease try another Date & Time.");
          }
          else
          {
            var dataTSRain = new Date(data.items[0].timestamp);
            $("#legend").after('<p id="rain" class="title" style="padding-top: 12px; padding-bottom: 12px;"><b>Weather Time Stamp: </b>' + dataTSRain + '</p>');

            for (var i=0; i<(data.metadata.stations).length; i++)
            {
              var deviceId = data.metadata.stations[i].device_id;
              var datalatRain = data.metadata.stations[i].location.latitude;
              var datalngRain = data.metadata.stations[i].location.longitude;
              var dataReadingUnit = data.metadata.reading_unit;
              var dataValueRain = data.items[0].readings[i].value;

              // if user switch to dark mode before searching for rainfall
              if ($(".mode").hasClass("nav-link mode dark"))
              {
                $("#rain.title").css({
                  'background-color' : '#404146'
                });
                $("p#rain.title").css({
                  'color' : '#edf0f1'
                });
              }

              // rainfall info window content 
              var contentStringRain =
              `<div id="content">
              <div id="siteNotice">
              </div>
              <div id="bodyContent">
              <p><b>Rainfall</b></p>
              <p style='font-size: 14px;'>Device ID: ${deviceId}</p>
              <p style='font-size: 14px;'>Latitude: ${datalatRain}</p>
              <p style='font-size: 14px;'>Longitude: ${datalngRain}</p>
              <p style='font-size: 14px; margin-bottom: 0%;'>Rainfall Value: ${dataValueRain}  ${dataReadingUnit}</p>
              </div>
              </div>`;

              // call function to add marker on map
              addMarkerRain({
                coords:{lat: datalatRain, lng: datalngRain},
                iconImageRain: 'images/rainfall.png',
                content: contentStringRain,
              });
            }
          }
        },
        // if input is incorrect (wrong format)
        error: function(data) {
          alert("Invalid datetime format \nCorrect format: YYYY-MM-DD[T]HH:mm:ss \n(e.g.: 2020-12-31T23:59:59)");
        }
        });
    });
  }, false);

  // removes rainfall details
  $('#emtpyRain').click(function(){
    $('#rain').remove();
    deleteMarkersRain();
  });
}

// for user current location
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

// to switch between light & dark modes (website appearance)
$(document).ready(function () {
  $(".mode").click(function () {
    if ($(this).hasClass('light')) {
      // dark mode
      $(this).attr('class', 'nav-link mode dark');
      $("a.dark").html("<i>Switch to Light Mode</i>");
      $("nav.navbar").attr('class', 'navbar navbar-expand-lg navbar-dark');
      $("body").css({
        'background-color' : '#35363b'
      });
      $("nav, footer").css({
        'background-color' : '#24252a'
      });
      $("a.navbar-brand, a.nav-link, a.dropdown-item, footer a, footer p, div.col-sm p, label, p#rain.title, div#infoDone p, div#legend.title p, div#intro p").css({
        'color' : '#edf0f1'
      });
      $("div.dropdown-menu, p#traffic.title, p#rain.title, div#legend.title, div#intro").css({
        'background-color' : '#404146'
      });
      $("button.navbar-toggler").css({
        'border-color' : '#edf0f1'
      });
    } else {
      // light mode
      $(this).attr('class', 'nav-link mode light');
      $("nav.navbar").attr('class', 'navbar navbar-expand-lg navbar-light');
      $("a.light").html("<i>Switch to Dark Mode</i>");
      $("nav, footer, p#traffic.title, p#rain.title, div#legend.title, div#intro").css({
        'background-color' : '#edf0f1'
      });
      $("a.nav-link").css({
        'color' : 'rgba(0,0,0,.5)'
      });
      $("a.navbar-brand, a.dropdown-item, footer a, footer p, div.col-sm p, label, p#rain.title, div#legend.title p, div#intro p").css({
        'color' : 'black'
      });
      $("body, div.dropdown-menu").css({
        'background-color' : 'white'
      });
      $("button.navbar-toggler").css({
        'border-color' : 'rgba(0,0,0,.1)'
      });
    }
  });
});

// to show/hide Introduction
$(document).ready(function () {
  $("div#intro p").hide();
  $(".intro").click(function () {
    if ($(this).hasClass('hide')) {
      $(this).attr('class', 'dropdown-item intro show');
      $("a.show").html("<i>Hide Introduction</i>");
      $('div#intro p').show();       
    } else {
      $(this).attr('class', 'dropdown-item intro hide');
      $("a.hide").html("<i>Show Introduction</i>");
      $("div#intro p").hide();
    }
  });
});