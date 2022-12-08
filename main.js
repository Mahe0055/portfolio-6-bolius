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
//Finder alle datapunkter med tagget "gaardhaver" og fjerner dem
    map.eachLayer(function (layer) {
        if (layer.myTag === "gaardhaver") {
            map.removeLayer(layer)
        }

    });

//Tilføjer et tag på hver daginstitutions datapunkt
    L.geoJSON(geojsonInst, {
        onEachFeature: function (feature, layer) {
            layer.myTag = "daginstitutioner";
            layer.bindPopup(feature.properties.enhedsnavn); //Tilføjer "enhedsnavn" på hver grøn cirkel
        },
        pointToLayer: function (feature, latlng) {//Daginstitutioner - runde grønne cirkler
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
            color: "#3E5959",
            dashArray: '3',
            fillOpacity: 0.7
        };

//Finder alle datapunkter med tagget "daginstitutioner" og fjerner dem
    map.eachLayer(function (layer) {
        if (layer.myTag === "daginstitutioner") {
            map.removeLayer(layer)
        }
    });

//Tilføjer et tag på hver gårdhave datapunkt
    L.geoJSON(geojsonGarden, {
        style: myStyle,
        onEachFeature: function (feature, layer) {
            layer.myTag = "gaardhaver"
            layer.bindPopup(feature.properties.karrenavn); //Tilføjer "karrenavn" på hver orange firkant
        }
    }).addTo(map);
});


// Vis alle "Radio button" der gør at daginstitutioner og gårdhaver bliver vist på kortet samtidig
const showAllRadioButton = document.querySelector("#showAll");
showAllRadioButton.addEventListener("click", function (event) {
// Tilføjer et tag på hver daginstitutions datapunkt
    L.geoJSON(geojsonInst, {
        onEachFeature: function (feature, layer) {
            layer.myTag = "daginstitutioner"
            layer.bindPopup(feature.properties.enhedsnavn); //Tilføjer "enhedsnavn" på hver grøn cirkel
        },
        pointToLayer: function (feature, latlng) {//Daginstitutioner - runde grønne cirkler
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(map);

//Gårdhaver - flade lysegrønne mærkninger
    const myStyle =
        {
            weight: 1,
            opacity: 100,
            color: "#3E5959",
            dashArray: '3',
            fillOpacity: 0.7
        };

//Tilføjer et tag på hver gårdhave datapunkt
    L.geoJSON(geojsonGarden, {
        style: myStyle,
        onEachFeature: function (feature, layer) {
            layer.myTag = "gaardhaver"
            layer.bindPopup(feature.properties.karrenavn); //Tilføjer "karrenavn" på hver orange firkant
        }
    }).addTo(map);
});

//Nulstil "button" der gør at daginstitutioner og gårdhaver bliver fjernet på kortet
const clearAllRadioButton = document.querySelector("#clearAll");
clearAllRadioButton.addEventListener("click", function (event) {
   //Fjerner daginstitutioner og gårdhaver layers, når man trykker på nulstil
    map.eachLayer(function (layer) {
        if (layer.myTag) {
            map.removeLayer(layer)
        }
    });
    map.setView([55.676098, 12.568337], 11); //Når man trykker på "nulstil" kommer kortet tilbage til udgangspunktet
});

