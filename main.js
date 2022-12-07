//Geographical coordinates
var map = L.map('map').setView([55.676098, 12.568337], 11);

//OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Daginstitutioner "Radio button" der gør at daginstitutioner bliver vist på kortet
const daycareRadioButton = document.querySelector("#day-careCentre");
daycareRadioButton.addEventListener("click", function (event) {
// Daginstitutioner - runde grønne cirkler
    L.geoJSON(geojsonInst, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(map);
});



// Gårdhaver "Radio button" der gør at gårdhaver bliver vist på kortet
const backGardenRadioButton = document.querySelector("#backGarden");
backGardenRadioButton.addEventListener("click", function (event) {
// Gårdhaver
    const myStyle =
    {
        weight: 1,
        opacity: 100,
        color: 'red',
        dashArray: '3',
        fillOpacity: 0.7
    };

    L.geoJSON(geojsonGarden, {style: myStyle}).addTo(map);
});

// Vis alle "Radio button" der gør at daginstitutioner og gårdhaver bliver vist på kortet samtidig
const showAllRadioButton = document.querySelector("#showAll");
showAllRadioButton.addEventListener("click", function (event) {
// Daginstitutioner - runde grønne cirkler
    L.geoJSON(geojsonInst, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(map);
// Gårdhaver
    L.geoJSON(geojsonGarden).addTo(map);
});

// Nulstil "button" der gør at daginstitutioner og gårdhaver bliver fjernet på kortet
const clearAllRadioButton = document.querySelector("#clearAll");
clearAllRadioButton.addEventListener("click", function (event) {
    document.location.reload();
});




