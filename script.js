

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
          var camId = data.items[0].cameras[0].camera_id
          console.log("Camera ID: " + camId);
          var datalat = data.items[0].cameras[0].location.latitude;
          //var contentlat = "";
          var datalng = data.items[0].cameras[0].location.longitude;
          //var contentlng = "";
          var image = data.items[0].cameras[0].image;
          console.log(image);
      
          $("#camera").append(camId);
          $("#coorLat").append(datalat);
          $("#coorLng").append(datalng);

          var img = document.createElement("img");
          img.src = image;
          var src = document.getElementById("header");
          src.appendChild(img);

          var contentString =
          '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          '<div id="bodyContent">' +
          "<p><b>Cam ID: </b>" + camId + "</p>" +
          "<b>Latitude: </b>" + datalat + "</p>" +
          "<b>Longitude: </b>" + datalng + "</p>" +
          "<b>Image: </b>" + img + "</p>" +
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
          "(last visited June 22, 2009).</p>" +
          "</div>" +
          "</div>";

          addMarker({
            coords:{lat: datalat, lng: datalng},
            content: contentString
          });
        }
        })
    });
  }, false);

};