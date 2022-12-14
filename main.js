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
    type: 'line',
    data: {
        labels: ['1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022'],
        datasets: [{
            label:"København",
            data: [43264,42469,42393,42507,42728,42723,43101,43840,44117,44796,45861,46965,47462,48169,49088,50108,50974,51785,52648,52850,52894,53709,54716,55974,57691,59503,61200,62652,63703,64927,65945,67582,68981,70307,71508,71601,71523],
            backgroundColor: ['rgb(238,92,71)'],
         },
            {
                label: 'Århus',
                data: [24582,24243,24091,23875,23723,23632,23536,23494,23409,23252,23350,23390,23166,23054,22914,22939,23031,23098,23173,23209,23381,23315,23375,23411,23541,23601,23562,23677,23589,23489,23519,23568,23614,23629,23694,23836,23944],
                backgroundColor: ['rgb(238,92,71,0.6)',]
            }
        ],

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
            },
            title: {
                display: true, // "Text" bliver vist ved "true"
                text: "Antal børnefamiler fra d. 1 januar 2022 opdelt i kommuner", // "Text" indhold
                padding: 10,
                font:{size: 14}
            },
        }
    }
});
