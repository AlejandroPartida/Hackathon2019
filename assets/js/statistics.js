var tp = 0;
var luz = 0;
var agua = 0;
var baches = 0;
var basura = 0;
var ma = 0;
var aop = 0;
var vi = 0;
var psc = 0;

var pend = 0, proc = 0, fina = 0;

var ver = 0, fal = 0;

var poc = 0;
var username;

db.collection('denuncias').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        if (doc.data().tipoReporte == "Transporte público") {
            tp++;
        } else if (doc.data().tipoReporte == "Luz") {
            luz++;
        } else if (doc.data().tipoReporte == "Agua") {
            agua++;
        } else if (doc.data().tipoReporte == "Baches") {
            baches++;
        } else if (doc.data().tipoReporte == "Basura") {
            basura++;
        } else if (doc.data().tipoReporte == "Maltrato animal") {
            ma++;
        } else if (doc.data().tipoReporte == "Alteración del orden público") {
            aop++;
        } else if (doc.data().tipoReporte == "Violencia intrafamiliar") {
            vi++;
        } else if (doc.data().tipoReporte == "Personas en situación de calle") {
            psc++;
        }

    })
    /*
    console.log('Transporte público '+tp);
    console.log('Luz '+luz);
    console.log('Agua '+agua);
    console.log('Baches '+baches);
    console.log('Basura '+basura);
    console.log('Maltrato animal '+ma);
    console.log('Alteración del orden público '+aop);
    console.log('Violencia intrafamiliar '+vi);
    console.log('Personas en situación de calle '+psc);*/

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Transporte público', 'Luz', 'Agua', 'Baches', 'Basura', 'Maltrato animal', 'Alteración del orden público', 'Violencia intrafamiliar', 'Personas en situación de calle'],
            datasets: [{
                data: [tp, luz, agua, baches, basura, ma, aop, vi, psc],
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)',
                    'rgba(220, 206, 86)',
                    'rgba(75, 150, 192)',
                    'rgba(153, 162, 255)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(220, 206, 86, 1)',
                    'rgba(75, 150, 192, 1)',
                    'rgba(153, 162, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

});

db.collection('denuncias').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        if (doc.data().estatus == "Pendiente") {
            pend++;
        } else if (doc.data().estatus == "En proceso") {
            proc++;
        } else if (doc.data().estatus == "Finalizada") {
            fina++;
        }
    })
    console.log('Pendiente ' + pend);
    console.log('Proceso ' + proc);
    console.log('Finalizada ' + fina);

    var ctx2 = document.getElementById('myChart2').getContext('2d');
    var myChart2 = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ['Pendiente', 'En proceso', 'Finalizada'],
            datasets: [{
                data: [pend, proc, fina],
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'

                ],
                borderWidth: 1
            }]
        },

    });

});

db.collection('denuncias').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        if (doc.data().veracidad == "Verdadera") {
            ver++;
        } else if (doc.data().veracidad == "Falsa") {
            fal++;
        }
    })
    console.log('Verdaderas ' + ver);
    console.log('Falsas ' + fal);


    var ctx3 = document.getElementById('myChart3').getContext('2d');
    var myChart3 = new Chart(ctx3, {
        type: 'doughnut',
        data: {
            labels: ['Verdadera', 'Falsa'],
            datasets: [{
                data: [ver, fal],
                backgroundColor: [
                    'rgba(0, 143, 57)',
                    'rgba(247, 094, 037)'

                ],
                borderColor: [
                    'rgba(0, 143, 57, 1)',
                    'rgba(247, 094, 037, 1)'

                ],
                borderWidth: 1
            }]
        },

    });

});


//User is signed in
db.collection('users').orderBy('poc', 'desc').limit(5)
    .get()
    .then(querySnapshot => {

        console.log(querySnapshot.empty);
        if (querySnapshot.empty) {
            ranking.innerHTML = '<h3> No existen usuarios </h3>'
        }
        else {
            querySnapshot.forEach(doc => {
                ranking.innerHTML += `
                <ul class="list-group">
                <li class="list-group-item">${doc.data().username}<span class="badge badge-primary badge-pill">${doc.data().poc}</span></li>
</ul>
       
                    `

            })
        }

    })