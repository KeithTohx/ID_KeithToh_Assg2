let markersArrayTraf = [];
let markersArrayRain = [];

function initMap() {
  // map options
  var options = {
    center: {lat: 1.3656, lng: 103.8530},
    zoom: 11
  }
  // new map
  var map = new google.maps.Map(document.getElementById('map'), options);


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
    console.log('hi traffic');
    var input_date = document.getElementById('dateTraf').value;;
    console.log(input_date);
  //}, false);

    $(document).ready(function(updatedata) {
      //@params settings
      console.log("ready traffic");
      var params = {
        // //YYYY-MM-DD[T]HH:mm:ss (SGT)
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
        // crossDomain: true,
        //@data returning JSON data
        success: function(data) {
          console.log(data);
          $("#details").before('<p id="traffic" class="title"><b>Traffic Details</b></p>');
          
          for (var i=0; i<(data.items[0].cameras).length; i++)
          {
            var camId = data.items[0].cameras[i].camera_id
            console.log("Camera ID: " + camId);
            var datalatTraf = data.items[0].cameras[i].location.latitude;
            var datalngTraf = data.items[0].cameras[i].location.longitude;
            var dataTSTraf = new Date(data.items[0].cameras[i].timestamp);
            var image = data.items[0].cameras[i].image;
            console.log(image);

            var div = document.createElement("div");
            div.id = "info";
            var src = document.getElementById("details");
            src.appendChild(div);

            $("#info").css({
              'background-color' : '#edf0f1',
              'padding-bottom' : '15px',
              'margin-bottom' : '10px'
            });
              
            $("#info").append('<p class="text"><b>Camera ID: </b>' + camId + "</p>");
            $("#info").append('<p class="text"><b>Latitude: </b>' + datalatTraf + "</p>");
            $("#info").append('<p class="text"><b>Longitude: </b>' + datalngTraf + "</p>");
            $("#info").append('<p class="text"><b>Time Stamp: </b>' + dataTSTraf + "</p>");

            var img = document.createElement("img");
            img.src = image;
            img.className = "img-fluid";
            img.width = 320;
            var src = document.getElementById("info");
            $("#info").append('<p class="text"><b>Traffic Image: </b></p>');
            src.appendChild(img);

            document.getElementById("info").id = "infoDone";

            var contentStringTraf =
            '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            '<div id="bodyContent">' +
            "<p>Cam ID: " + camId + 
            "<p>Latitude: " + datalatTraf + 
            "<p>Longitude: " + datalngTraf + "</p>" +
            "</div>" +
            "</div>";

            // call function to add marker on map
            addMarkerTraf({
              coords:{lat: datalatTraf, lng: datalngTraf},
              iconImageTraf: 'images/camera.png',
              content: contentStringTraf
            });

          };

        },
        // if input is incorrect (wrong format)
        error: function(data) {
          console.log("invalid datetime format");
          alert("Invalid datetime format \nCorrect format: YYYY-MM-DD[T]HH:mm:ss");
        }
        })
    });
  }, false);

  let emtpyTraf = document.getElementById('emtpyTraf');
  emtpyTraf.addEventListener('click', function() {
    console.log('bye traffic');

    $(document).ready(function(updatedata) {
      $('#traffic').remove();
      $('#details').empty();
      deleteMarkersTraf();
    });
  }, false);



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
    console.log('hi rain');
    var input_date = document.getElementById('dateRain').value;;
    console.log(input_date);
  //}, false);

    $(document).ready(function(updatedata) {
      //@params settings
      console.log("ready rain");
      var params = {
        // //YYYY-MM-DD[T]HH:mm:ss (SGT)
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
        // crossDomain: true,
        //@data returning JSON data
        success: function(data) {
          console.log(data);
          
          var dataTSRain = new Date(data.items[0].timestamp);
          $("#map").after('<p id="rain" class="title"><b>Weather Time Stamp: </b>' + dataTSRain + '</p>');

          for (var i=0; i<(data.metadata.stations).length; i++)
          {
            var deviceId = data.metadata.stations[i].device_id;
            console.log("Device ID: " + deviceId);
            var datalatRain = data.metadata.stations[i].location.latitude;
            var datalngRain = data.metadata.stations[i].location.longitude;
            //var dataTSRain = new Date(data.items[0].timestamp);
            var dataReadingUnit = data.metadata.reading_unit;
            var dataValueRain = data.items[0].readings[i].value;

            var contentStringRain =
            '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            '<div id="bodyContent">' +
            "<p>Device ID: " + deviceId +
            "<p>Latitude: " + datalatRain + 
            "<p>Longitude: " + datalngRain + 
            "<p>Rainfall Value: " + dataValueRain + " " + dataReadingUnit + "</p>" +
            "</div>" +
            "</div>";

            // call function to add marker on map
            addMarkerRain({
              coords:{lat: datalatRain, lng: datalngRain},
              iconImageRain: 'images/rainfall.png',
              content: contentStringRain,
            });

          };

        },
        // if input is incorrect (wrong format)
        error: function(data) {
          console.log("invalid datetime format");
          alert("Invalid datetime format \nCorrect format: YYYY-MM-DD[T]HH:mm:ss");
        }
        })
    });
  }, false);

  let emtpyRain = document.getElementById('emtpyRain');
  emtpyRain.addEventListener('click', function() {
    console.log('bye rain');

    $(document).ready(function(updatedata) {
      $('#rain').remove();
      deleteMarkersRain();
    });
  }, false);
};