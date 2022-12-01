//Geographical coordinates
var map = L.map('map').setView([55.676098, 12.568337], 13);

//OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Marker
var marker = L.marker([51.5, -0.09]).addTo(map);

L.geoJSON(geojsonFeature).addTo(map);
myLayer.addData(geojsonFeature);