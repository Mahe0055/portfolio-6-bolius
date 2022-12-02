//Geographical coordinates
var map = L.map('map').setView([55.676098, 12.568337], 11);

//OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Tilføjer daginstitutioner på kortet
L.geoJSON(geojsonInst).addTo(map);

//Tilføjer gårdhaver kortet
L.geoJSON(geojsonGarden).addTo(map);

