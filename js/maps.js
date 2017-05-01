function initMap() {
  var options = {
    zoom: 9,
    disableDefaultUI: true
  };

  var map = new google.maps.Map(document.getElementById("map"), options);

  centralizeMap(map);
  addMarkers(map);
  overlayStateBorders(map);
}

function addMarkers(map) {
  var place = new google.maps.LatLng(-9.663104, -35.698646);
  var marker = new google.maps.Marker({
    position: place,
    animation: google.maps.Animation.DROP,
    icon: "./img/pin.png",
    url: "http://www.stant.com.br/"
  });

  marker.setMap(map);

  google.maps.event.addListener(marker, 'click', function() {
    window.location.href = this.url;
  });
}

function centralizeMap(map) {
  var bound = new google.maps.LatLngBounds();
  var geocoder = new google.maps.Geocoder();
  var address = 'Alagoas';

  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function overlayStateBorders(map) {
  var stateCoords = $.getJSON("./data/AL.json", function(data) {
    var statePolygon = new google.maps.Polygon({
      paths: data.borders,
      strokeColor: '#F47757',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#ffdcd3',
      fillOpacity: 0.35
    });

    statePolygon.setMap(map);
  });
}
