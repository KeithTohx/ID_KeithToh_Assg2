

function initMap() {
  // map options
  var options = {
    center: {lat: 1.3656, lng: 103.8530},
    zoom: 11
  }
  // new map
  var map = new google.maps.Map(document.getElementById('map'), options);

  // add marker
  /*var marker = new google.maps.Marker({
    position: {lat: 1.333498666, lng: 103.772830242},
    map: map
  });

  var infoWindow = new google.maps.InfoWindow({
    content: '<h1>Ngee Ann Poly</h1>'
  });

  marker.addListener('click', function(){
    infoWindow.open(map, marker);
  });*/

  function addMarker(props){
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map
    });

    // check content
    if (props.content){
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });
    
      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
    }
  }



  let checker = document.getElementById('checker');
  checker.addEventListener('click', function() {
    console.log('hi');
    var input_date = document.getElementById('date').value;;
    console.log(input_date);
  //}, false);

    $(document).ready(function(updatedata) {
      //@params settings
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
          for (var i=0; i<(data.items[0].cameras).length; i++)
          {
            var camId = data.items[0].cameras[i].camera_id
            console.log("Camera ID: " + camId);
            var datalat = data.items[0].cameras[i].location.latitude;
            //var contentlat = "";
            var datalng = data.items[0].cameras[i].location.longitude;
            //var contentlng = "";
            var image = data.items[0].cameras[i].image;
            console.log(image);

            $("#header").append("<h3>Camera ID: " + camId + "</h3>");
            $("#header").append("<h3>Latitude: " + datalat + "</h3>");
            $("#header").append("<h3>Longitude: " + datalng + "</h3>" + "<br>");

            var img = document.createElement("img");
            img.src = image;
            var src = document.getElementById("header");
            $("#header").append("<h3>Traffic Image: </h3>");
            src.appendChild(img);


            var contentString =
            '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            '<div id="bodyContent">' +
            "<p><b>Cam ID: </b>" + camId + "</p>" +
            "<p><b>Latitude: </b>" + datalat + "</p>" +
            "<p><b>Longitude: </b>" + datalng + "</p>" +
            '<button id="details">View Details</button>' +
            "</div>" +
            "</div>";

            addMarker({
              coords:{lat: datalat, lng: datalng},
              content: contentString
            });
          }

          /*
          $("#header").append("<h3>Camera ID: " + camId + "</h3>");
          $("#header").append("<h3>Latitude: " + datalat + "</h3>");
          $("#header").append("<h3>Longitude: " + datalng + "</h3>" + "<br>");

          var img = document.createElement("img");
          img.src = image;
          var src = document.getElementById("header");
          $("#header").append("<h3>Traffic Image: </h3>");
          src.appendChild(img);


          var contentString =
          '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          '<div id="bodyContent">' +
          "<p><b>Cam ID: </b>" + camId + "</p>" +
          "<p><b>Latitude: </b>" + datalat + "</p>" +
          "<p><b>Longitude: </b>" + datalng + "</p>" +
          '<button id="details">View Details</button>' +
          "</div>" +
          "</div>";

          addMarker({
            coords:{lat: datalat, lng: datalng},
            content: contentString
          });*/

        }
        })
    });
  }, false);

};