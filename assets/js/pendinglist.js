
const quejas = document.getElementById('quejas');
const tipo = document.getElementById('tipo');
const lugar = document.getElementById('lugar');
const descripcion = document.getElementById('descripcion');
const imagen = document.getElementById('imagen');
const tipoQueja = document.getElementById('tipoQueja');
const btnAtender = document.getElementById('atender');
const btnModal = document.getElementById('botonesModal');


function mostrarQuejasPendientes() {
    tipoQueja.selectedIndex = "0";
    db.collection('denuncias').where('estatus', '==', 'Pendiente').orderBy('createdAt', 'desc')
                .get()
                .then(querySnapshot => {

                    if (querySnapshot.empty && tipoQueja.selectedIndex != "0") {
                        alert('No hay ninguna queja pendiente');
                    }

                    querySnapshot.forEach(doc => {
                        var date = doc.data().createdAt.toDate();
                        console.log(date);
                        
                        var typeImg = "";
                        if(doc.data().tipoReporte == "Transporte público"){
                            typeImg = "assets/img/bus.png";
                        }else if(doc.data().tipoReporte == "Luz"){
                            typeImg = "assets/img/lightsimg.png";
                        }else if(doc.data().tipoReporte == "Agua"){
                            typeImg = "assets/img/water.png";
                        }else if(doc.data().tipoReporte == "Baches"){
                            typeImg = "assets/img/street.png";
                        }else if(doc.data().tipoReporte == "Basura"){
                            typeImg = "assets/img/trash.png";
                        }else if(doc.data().tipoReporte == "Maltrato animal"){
                            typeImg = "assets/img/pets.png";
                        }else if(doc.data().tipoReporte == "Alteración del orden público"){
                            typeImg = "assets/img/sound.png";
                        }else if(doc.data().tipoReporte == "Personas en situación de calle"){
                            typeImg = "assets/img/homeless.png";
                        }
                        

                        var username;
                        db.collection('users').doc(doc.data().sentBy).get().then(doc1 => {
                            username = doc1.data().username;
                            quejas.innerHTML += `
                        <br>
                        <div class="col-sm-6">
                           <div class="card" style="box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);">
                                <div class="card-header text-muted">${date.getUTCDate() + '/' + (date.getUTCMonth() + 1) + '/' + date.getFullYear() + ' a las ' + date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2)}</div>
                                    <div class="card-body">
                                         <div class="row no-gutters">
                                            <div class="col-md-4">
                                                <a href="#">
                                                    <img src="${typeImg}"
                                                                class="card-img"
                                                                style="margin-top: 5%; margin-left: 15%; border-radius: 50%; width: 70%; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);"></img>
                                                </a>
                                            </div>
                                            <div class="col-md-8">
                                                 <div class="card-body">
                                                     <a href="#">
                                                        <h4 class="card-title">
                                                            ${doc.data().tipoReporte}</h4>
                                                    </a>
                                                    <p class="card-text">Usuario: ${username}</p>
                                                    <p class="card-text">Descripción: ${doc.data().descripcion}</p>
                                                    <button type="button" onclick="setValuesOnModalInputs('${doc.id}', '${doc.data().tipoReporte}', '${doc.data().lugar}', '${doc.data().descripcion}', '${doc.data().pictureURL}')"
                                                        class="btn btn-custon-four btn-link pull-right"
                                                            data-toggle="modal" data-target="#modal"><i
                                                            class="fa fa-info-circle"></i>&nbsp;Detalles</button>

                                                 </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <br>

                            </div>

                        `
                        })


                    })
                })
}

function filtrarQuejasPorTipo(tipo) {
    quejas.innerHTML = "";
    
    if(tipo === "0") {
        mostrarQuejasPendientes();
    } else {
        db.collection('denuncias').where('estatus', '==', 'Pendiente').where('tipoReporte', '==', tipo).orderBy('createdAt', 'desc')
                .get()
                .then(querySnapshot => {

                    console.log(querySnapshot.empty);
                    if (querySnapshot.empty && tipoQueja.selectedIndex != "0") {
                        alert('No hay ninguna queja pendiente');
                    }

                    querySnapshot.forEach(doc => {
                        var date = doc.data().createdAt.toDate();
                        console.log(date);
                        
                        var typeImg = "";
                        if(doc.data().tipoReporte == "Transporte público"){
                            typeImg = "assets/img/bus.png";
                        }else if(doc.data().tipoReporte == "Luz"){
                            typeImg = "assets/img/lightsimg.png";
                        }else if(doc.data().tipoReporte == "Agua"){
                            typeImg = "assets/img/water.png";
                        }else if(doc.data().tipoReporte == "Baches"){
                            typeImg = "assets/img/street.png";
                        }else if(doc.data().tipoReporte == "Basura"){
                            typeImg = "assets/img/trash.png";
                        }else if(doc.data().tipoReporte == "Maltrato animal"){
                            typeImg = "assets/img/pets.png";
                        }else if(doc.data().tipoReporte == "Alteración del orden público"){
                            typeImg = "assets/img/sound.png";
                        }else if(doc.data().tipoReporte == "Personas en situación de calle"){
                            typeImg = "assets/img/homeless.png";
                        }
                        
                        var username;
                        db.collection('users').doc(doc.data().sentBy).get().then(doc1 => {
                            username = doc1.data().username;
                            quejas.innerHTML += `
                        <br>
                        <div class="col-sm-6">
                           <div class="card" style="box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);">
                                <div class="card-header text-muted">${date.getUTCDate() + '/' + (date.getUTCMonth() + 1) + '/' + date.getFullYear() + ' a las ' + date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2)}</div>
                                    <div class="card-body">
                                         <div class="row no-gutters">
                                            <div class="col-md-4">
                                                <a href="#">
                                                    <img src="${typeImg}"
                                                                class="card-img"
                                                                style="margin-top: 5%; margin-left: 15%; border-radius: 50%; width: 70%; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);"></img>
                                                </a>
                                            </div>
                                            <div class="col-md-8">
                                                 <div class="card-body">
                                                     <a href="#">
                                                        <h4 class="card-title">
                                                            ${doc.data().tipoReporte}</h4>
                                                    </a>
                                                    <p class="card-text">Usuario: ${username}</p>
                                                    <p class="card-text">Descripción: ${doc.data().descripcion}</p>
                                                    <button type="button" onclick="setValuesOnModalInputs(${doc.id, doc.data().tipoReporte, doc.data().lugar, doc.data().descripcion, doc.data().pictureURL})"
                                                        class="btn btn-custon-four btn-link pull-right"
                                                            data-toggle="modal" data-target="#modal"><i
                                                            class="fa fa-info-circle"></i>&nbsp;Detalles</button>

                                                 </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <br>

                            </div>

                        `
                        });

                        //console.log(date.getUTCDate() + '/' + (date.getUTCMonth() + 1) + '/' + date.getFullYear());
                        

                    });
                });
    }
    
}

function clearModalInputs1() {
    tipo.value = '';
    lugar.value = '';
    descripcion.value = '';
    imagen.src = '';
}

function setValuesOnModalInputs(documentId, tipoReporte, lugarR, descR, imgURL){
    console.log(tipoReporte);
    
    clearModalInputs1();
    tipo.value = tipoReporte;
    lugar.value = lugarR;
    descripcion.value = descR;
    imagen.src = imgURL;
    btnModal.innerHTML = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
    <button type="button" class="btn btn-success" id="atender" onclick="updateStatus('${documentId}')"data-dismiss="modal">Atender</button>` 
}

function updateStatus(documentId) {
    db.collection('denuncias').doc(documentId).update({
        estatus: 'En proceso'
    }).then(() => {
        Swal.fire({
            title: '¡Queja atendida!',
            text: "Ahora el estatus de esta queja es 'En proceso'",
            type: 'success'
        })
    });
}

window.onload = mostrarQuejasPendientes();
