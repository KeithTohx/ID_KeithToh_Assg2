let markersArray = [];

function initMap() {
  // map options
  var options = {
    center: {lat: 1.3656, lng: 103.8530},
    zoom: 11
  }
  // new map
  var map = new google.maps.Map(document.getElementById('map'), options);

  // Adds a marker to the map and push to the array
  function addMarker(props){
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map
    });
    markersArray.push(marker);

    // check for custom icon
    if (props.iconImage){
      marker.setIcon(props.iconImage);
    }

    // check content
    if (props.content){
      let infoWindow = new google.maps.InfoWindow({
        content: props.content
      });
    
      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
    }
  }

  // sets the map on all markers in the array
  function setMapOnAll(map) {
    for (let i = 0; i < markersArray.length; i++) {
      markersArray[i].setMap(map);
    }
  }

  // deletes all markers in the array by removing references to them
  function deleteMarkers() {
    setMapOnAll(null);
    markersArray = [];
  }


  let searchBtn = document.getElementById('searchBtn');
  searchBtn.addEventListener('click', function() {
    console.log('hi');
    var input_date = document.getElementById('date').value;;
    console.log(input_date);
  //}, false);

    $(document).ready(function(updatedata) {
      //@params settings
      console.log("ready");
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
          $("#details").before('<p id="td" class="title"><b>Traffic Details</b></p>');
          
          for (var i=0; i<(data.items[0].cameras).length; i++)
          {
            var camId = data.items[0].cameras[i].camera_id
            console.log("Camera ID: " + camId);
            var datalat = data.items[0].cameras[i].location.latitude;
            var datalng = data.items[0].cameras[i].location.longitude;
            var dataDT = new Date(data.items[0].cameras[i].timestamp);
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
            $("#info").append('<p class="text"><b>Latitude: </b>' + datalat + "</p>");
            $("#info").append('<p class="text"><b>Longitude: </b>' + datalng + "</p>");
            $("#info").append('<p class="text"><b>Time Stamp: </b>' + dataDT + "</p>");

            var img = document.createElement("img");
            img.src = image;
            img.className = "img-fluid";
            img.width = 320;
            var src = document.getElementById("info");
            $("#info").append('<p class="text"><b>Traffic Image: </b></p>');
            src.appendChild(img);

            document.getElementById("info").id = "infoDone";

            var contentString =
            '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            '<div id="bodyContent">' +
            "<p>Cam ID: " + camId + 
            "<p>Latitude: " + datalat + 
            "<p>Longitude: " + datalng + "</p>" +
            "</div>" +
            "</div>";

            // call function to add marker on map
            addMarker({
              coords:{lat: datalat, lng: datalng},
              iconImage: 'images/camera.png',
              content: contentString,
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

  let emptyBtn = document.getElementById('emtpyBtn');
  emptyBtn.addEventListener('click', function() {
    console.log('bye');

    $(document).ready(function(updatedata) {
      $('#td').remove();
      $('#details').empty();
      deleteMarkers();
    });
  }, false);
};