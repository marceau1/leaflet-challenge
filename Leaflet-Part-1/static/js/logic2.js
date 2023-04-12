// create the map
var map = L.map('map').setView([0, 0], 2);
// Add the OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);
// store the AP endpoint as queryURL
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// get request to the url
d3.json(url).then(function (data) {
// send the data feature object to the createfeatures function    createFeatures(data.features);
// log the object data
    console.log(data)
    createFeatures(data)

// create the map function
function createFeatures(earthquakeData) {
// Define a function that we want to run once for each feature in the features array.
// Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>
      <p>Latitude: ${(feature.geometry.coordinates[0])} <br> Longitude: ${(feature.geometry.coordinates[1])}</p>
      <p>Magnitude: ${(feature.properties.mag)}</p>
      <p>Depth: ${(feature.geometry.coordinates[2])}</p>
      <br><p>Date:  ${new Date(feature.properties.time)}</p>`);
    }
// Create a GeoJSON layer that contains the features array on the earthquakeData object.
// Run the onEachFeature function once for each piece of data in the array.
    L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        console.log(colorCircle(feature.geometry.coordinates[2]))
        return L.circleMarker(latlng, {
          radius: radiusSize(feature.properties.mag),
          fillColor: colorCircle(feature.geometry.coordinates[2]),
          color: '#F84707',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        });
      }
    }).addTo(map);
    // Send our earthquakes layer to the createMap function.
    // createMap(earthquakes);
  }
  function radiusSize(mag) {
  
    if (mag === 0) {      return 1;    }
        return mag * 2;  }

    // console.log("Depth:", depth);
    // var radius = // Calculate the radius based on the depth
    // console.log("Radius:", radius);
    // return radius;
  
  function colorCircle(depth) {
    var color;

    switch (true) {
        case depth >= 90:
          color = '#FF5733';
          break;
        case depth >= 70:
          color = '#FF5733';
          break;
        case depth >= 50:
          color = '#F88707';
          break;

          case depth >= 30:
          color = '#DAF7A6';
          break;
          case depth >= 20:
          color = '#FFC300';
          break;
          case depth >= 10:
          color = '#75F807';
          break;
          case depth >= -10:
          color = '#75F807';
          break;
        default:
          color = '#1F0602';
          break;
      }
    
      return color;
    }


// create the legend control
let legend = L.control({position: "bottomright"});
// create the function for the legend
legend.onAdd = function(){

  var div = L.DomUtil.create("div", "info legend");
  var color = ['#75F807', '#75F807', '#F88707', '#FFC300', '#EDF807', '#EDF807', '#DAF7A6', '#FF5733', '#FF5733'];
  var intervals = [-10, 10, 20, 30, 50, 70, 90];

  // loop through the interval and add a lable color for each of them

  // for (var interval = 0; intervals.legend; interval++){
    for (var interval = 0; interval < intervals.length; interval++){


    console.log(color[interval]);
    console.log(intervals[interval]);
    div.innerHTML += "<i style='background: " + color[interval] + "'></i> "
        + intervals[interval] + (intervals[interval + 1] ? "&ndash;" + intervals[interval + 1] + "<br>" : "+");
 
    }
  return div;
};
    legend.addTo(map);

});
