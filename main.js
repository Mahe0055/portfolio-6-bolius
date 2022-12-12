//Geografiske koordinater i København
let map = L.map('map').setView([55.676098, 12.568337], 11.5);

//HTML Knapper
const daycareRadioButton = document.querySelector("#day-careCentre"); //"Daginstitutioner" knap
const backGardenRadioButton = document.querySelector("#backGarden"); //"Gårdhaver" knap
const showAllRadioButton = document.querySelector("#showAll"); //"Vis alle" knap
const clearAllRadioButton = document.querySelector("#clearAll"); //"Nulstil" knap

//Gårdhave styling - mørke grønne "firkanter" på kortet
const myStyle =
    {
        weight: 1,
        opacity: 100,
        color: "#3E5959",
        dashArray: '3',
        fillOpacity: 0.7
    };

//OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Daginstitutioner "Radio button" der gør at daginstitutioner bliver vist på kortet
daycareRadioButton.addEventListener("click", function (event) {
    //Finder alle datapunkter med tagget "gaardhaver" og fjerner dem, da gårdhaver ikke skal vises, når man trykker på daginstitutioner
    map.eachLayer(function (layer) {
        if (layer.myTag === "gaardhaver") {
            map.removeLayer(layer)
        }
    });

    L.geoJSON(geojsonInst, {
        onEachFeature: function (feature, layer) {
            layer.myTag = "daginstitutioner"; //Tilføjer et tag på hver daginstitutions datapunkt
            layer.bindPopup(feature.properties.enhedsnavn + " " + "<br>" + feature.properties.vejadresseringsnavn); //Tilføjer "enhedsnavn" på hver grøn cirkel
        },
        pointToLayer: function (feature, latlng) {//Daginstitutioner - runde grønne cirkler
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(map);
});

//Gårdhaver "Radio button" der gør at gårdhaver bliver vist på kortet
backGardenRadioButton.addEventListener("click", function (event) {
    //Finder alle datapunkter med tagget "daginstitutioner" og fjerner dem, da daginstitutioner ikke skal vises, når man trykker på gårdhaver
    map.eachLayer(function (layer) {
        if (layer.myTag === "daginstitutioner") {
            map.removeLayer(layer)
        }
    });

    L.geoJSON(geojsonGarden, {
        style: myStyle,
        onEachFeature: function (feature, layer) {
            layer.myTag = "gaardhaver" //Tilføjer et tag på hver gårdhave datapunkt
            layer.bindPopup(feature.properties.karrenavn); //Tilføjer "karrenavn" på hver gårdhave, så når man trykker, ser man navnet på gårdhaven
        }
    }).addTo(map);
});

//Vis alle "Radio button" der gør at daginstitutioner og gårdhaver bliver vist på kortet samtidig
showAllRadioButton.addEventListener("click", function (event) {
    L.geoJSON(geojsonInst, {
        onEachFeature: function (feature, layer) {
            layer.myTag = "daginstitutioner" //Tilføjer et tag på hver daginstitutions datapunkt
            layer.bindPopup(feature.properties.enhedsnavn); //Tilføjer "enhedsnavn" på hver grøn cirkel, så når man trykker, vises navnet på daginstitutionen
        },
        pointToLayer: function (feature, latlng) { //Daginstitutioner - runde grønne cirkler
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(map);

    L.geoJSON(geojsonGarden, {
        style: myStyle,
        onEachFeature: function (feature, layer) {
            layer.myTag = "gaardhaver" //Tilføjer et tag på hver gårdhave datapunkt
            layer.bindPopup(feature.properties.karrenavn); //Tilføjer "karrenavn" på hver gårdhave, så når man trykker, ser man navnet på gårdhaven
        }
    }).addTo(map);
});

//Nulstil "button" der gør at daginstitutioner og gårdhaver bliver fjernet på kortet
clearAllRadioButton.addEventListener("click", function (event) {
    //Fjerner daginstitutioner og gårdhaver layers, når man trykker på nulstil
    map.eachLayer(function (layer) {
        if (layer.myTag) {
            map.removeLayer(layer)
        }
    });
    map.setView([55.676098, 12.568337], 11); //Når man trykker på "nulstil" kommer kortet tilbage til udgangspunktet

    //Fjerner daginstitutioner og gårdhaver layers, når man trykker på nulstil
    daycareRadioButton.checked = false
    backGardenRadioButton.checked = false
    showAllRadioButton.checked = false
});


const ctx = document.querySelector('#chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['København', 'Århus', 'Odense'],
        datasets: [{
            data: [71523,38079,22778],
            backgroundColor: ['#ee5c47','rgb(238,92,71,0.6)','rgb(238,92,71,0.6)',]
        }]
    },
    options: {
        scales: {
            x: {
                grid: {
                    display: false // Fjernet lodret gitter ved "false"
                },
            },

            y: {
                grid: {
                    display: false // Fjernet lodret gitter ved "false"
                },
            }
        },
        plugins: {
            legend: {
                position: "bottom",
                display: false // Fjernet "bottom"

            },
            title: {
                display: true, // "Text" bliver vist ved "true"
                text: "Antal børnefamiler d. 1 januar 2022", // "Text" indhold
                padding: 10,
                font:{size: 14}
            },
        }
    }
});