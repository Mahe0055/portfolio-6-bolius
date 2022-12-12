
const ctx = document.querySelector('#chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Børn i KBH'],
        datasets: [{
        label: "København",
        data: [71523],
        ],
    },
{
    label: "Århus",
        data: [38079],
]},
});

//['København', 'Århus', 'Aalborg', 'Odense'],
/*
type: 'bar',
    data: {
        labels: ["Vinter vs sommer"],
        datasets: [{
            label: "Jan",
            data: [8928],
            backgroundColor: [
                'rgb(63, 112, 253, 0.9)' //blå
            ],
    stack: 'Stack 0',
},
    {
        label: "Feb",
        data: [8598],
        backgroundColor: [
            'rgb(165, 188, 255, 0.9)' //lyseblå
        ],
        stack: 'Stack 0',
    },
    {
        label: "Dec",
        data: [10469],
        backgroundColor: [
            'rgb(0, 44, 173, 0.9)' //mørkeblå
        ],
        stack: 'Stack 0',
    },
    {
        label: "Jun",
        data: [22704],
        backgroundColor: [
            'rgb(255, 196, 0)' //gul
        ],
        stack: 'Stack 1',
    },
    {
        label: "Jul",
        data: [34950],
        backgroundColor: [
            'rgb(255,128,0)' //orange
        ],
        stack: 'Stack 1',
    },
    {
        label: "Aug",
        data: [37395],
        backgroundColor: [
            'rgb(252, 0, 0 , 0.9)' //rød
        ],
        stack: 'Stack 1',
    },
],
},
options: {
    scales: {
        x: {
            grid: {
                display: false // Fjernet lodret gitter ved "false"
            },
            stacked: true,
        },

        y: {
            grid: {
                display: false // Fjernet lodret gitter ved "false"
            },
            stacked: true
        }
    },
    plugins: {
        legend: {
            position: "bottom"
        },
        title: {
            display: true, // "Text" bliver vist ved "true"
                text: "Antal fugle strejke der kolliderer med et fly om vinteren og sommeren", // "Text" indhold
                padding: 10,
                font:{size: 14}
        }

    }
}
});
/*
