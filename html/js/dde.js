//pattern.draw('square', '#ff6384'),
//pattern.draw('circle', '#36a2eb'),
//pattern.draw('diamond', '#cc65fe'),
//pattern.draw('triangle', '#ffce56'),
var ctx = document.getElementById("q1").getContext('2d');
var ctx2 = document.getElementById("q2").getContext('2d');
var ctx3 = document.getElementById("q3").getContext('2d');
//var    data = ;
var q1 = new Chart(ctx, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [41, 59],
            backgroundColor: ["#ff6384", "#36a2eb"],
            
        }],
        
        labels: ['不知道','知道']
        
    },
    options: {
        animation: {
            animateScale: true
        }
    },
    fontSize:33
});

var  q2 = new Chart(ctx2, {
    type: 'horizontalBar',
    data: {
        labels : ["F2D","B2D","APP","HCI","Tech Consultation","Web Site","Trainning","Project Managrment","Data Mining"],
        datasets : [{
                label:"DDE 在做什麼",
                data : [0.33,0.41,0.58,0.16,0.25,0.41,0.083,0.083,0.083],
            backgroundColor: "rgba(255,99,132,0.5)",
            borderColor:"rgba(255,99,132,1)",
            borderWidth:1,          
            }

        ]
    },
    options: {
        scales: {
            xAxes: [{
                gridLines: {
                    offsetGridLines: true
                }
            }]
        }
    }
});

var q3 = new Chart(ctx3, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [5,3,1,3,3 ],
            backgroundColor: ["#ff6384", "#36a2eb",'#cc65fe',"rgba(185,235,60,1)",'#ffce56'],
            
        }],
        
        labels: ['Chaz','Troie','Heather','WRP','Other']
        
    },
    options: {
        animation: {
            animateScale: true
        }
    },
    fontSize:33
});
