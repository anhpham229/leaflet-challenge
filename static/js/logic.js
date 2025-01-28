// Create the 'basemap' tile layer that will be the background of our map.

// Create the 'street' tile layer as a second background of the map
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the map object with center and zoom options.
let map = L.map("map", {
  center: [39.876019, -117.224121],
  zoom: 5,
  layers: [street]
});

// Then add the 'basemap' tile layer to the map.
let baseMaps = {
  "Street Map": street
};

// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. Pass the magnitude and depth of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      color: getColor(feature.geometry.coordinates[2]),  // Depth-based color
      radius: getRadius(feature.properties.mag),          // Magnitude-based radius
      fillOpacity: 0.4,
      weight: 1
    };
  }

  // Initialize an array to hold earthquake circles.
  let earthquakeCircles = [];

  // Loop through the features array.
  for (let index = 0; index < data.features.length; index++) {
    let feature = data.features[index];

    // For each feature, create a marker, and bind a popup with the feature's place.
    let latlng = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]]
    let earthquakeCircle = L.circleMarker(latlng, styleInfo(feature));

    // Bind a popup to each circle marker
    earthquakeCircle.bindPopup(`
      <h3>${feature.properties.place}</h3>
      <hr>
      <p>Magnitude: ${feature.properties.mag}<br>
      Depth: ${feature.geometry.coordinates[2]} km</p>
    `);

    // Add the cirle to the earthquakeCirles array.
    earthquakeCircles.push(earthquakeCircle);
  }

  // Create a layer group that's made from the earthquake markers array, and pass it to the createMap function.
  let earthquakeLayer = L.layerGroup(earthquakeCircles);
  
  // Add the layer group to the map
  earthquakeLayer.addTo(map);
  
  // This function determines the color of the marker based on the depth of the earthquake.
  function getColor(depth) {
    if (depth > 90) {
      return "#de5219";
    } else if (depth > 70) {
      return "#de7c19";
    } else if (depth > 50) {
      return "#de9c19";
    } else if (depth > 30) {
      return "#ffe333";
    } else if (depth > 10) {
      return "#f1f809";
    } else {
      return "#42da2c";
    }
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
    return Math.sqrt(magnitude) * 5;
  }

  // Create a legend control object.
  let legend = L.control({ position: "bottomright" });

  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

  // Initialize depth intervals and colors for the legend
  let depthRanges = ['-10-10', '10-30', '30-50', '50-70', '70-90', '90+'];
  let colors = ["#42da2c", "#f1f809", "#ffe333", "#de9c19", "#de7c19", "#de5219"];
  let labels = [];

  // Loop through our depth intervals to generate a label with a colored square for each interval.
  for (let i = 0; i < depthRanges.length; i++) {
    labels.push(
      '<div style="display: flex; align-items: center;">' + 
      '<i style="background:' + colors[i] + '; width: 20px; height: 20px; margin-right: 8px;"></i>' + // Color box with margin
      depthRanges[i] + 
      '</div>'
    );
  }
  div.innerHTML +=  "<ul>" + labels.join("") + "</ul>";
  return div;
};

  // Finally, add the legend to the map.
  legend.addTo(map);
});
