var map;
var marker, circle, i;
let markerArray = [];
let circleArray = [];
function initMap() {
  $("#map").css("height", $(window).height());
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: new google.maps.LatLng(32.33291, 34.85992),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
  var infowindow = new google.maps.InfoWindow();

  // console.log(markerArray);
  // console.log(circleArray);
}
