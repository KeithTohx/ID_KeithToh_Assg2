function initMap() {
  var options = {
    center: {lat: 1.3656, lng: 103.8530},
    zoom: 11
  }
  var map = new google.maps.Map(document.getElementById('map'), options);
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
        console.log("Camera ID: " + data.items[0].cameras[0].camera_id);
        var lat = data.items[0].cameras[0].location.latitude;
        //var contentlat = "";
        var lng = data.items[0].cameras[0].location.longitude;
        //var contentlng = "";
        var image = data.items[0].cameras[0].image;
        console.log(image);
    
        $("#coorLat").append(lat);
        $("#coorLng").append(lng);

        var img = document.createElement("img");
        img.src = image;
        var src = document.getElementById("header");
        src.appendChild(img);

      }
      })
  });
}, false);
