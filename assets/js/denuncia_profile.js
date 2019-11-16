var downloadUrl;

const quejas = document.getElementById('quejas');
const tipo = document.getElementById('tipo1');
const lugar = document.getElementById('lugar');
const descripcion = document.getElementById('descripcion1');
const imagen = document.getElementById('imagen');
const hacerDenuncia = document.getElementById('denuncia');
var latitude;
var longitude;


var userUid;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var userId = user.uid;
        userUid = userId;
    } else {
        // No user is signed in.

    }
});


async function fotoDenuncia() {

    const { value: file } = await Swal.fire({
        title: 'Seleccione una imagen',
        input: 'file',
        inputAttributes: {
            'accept': 'image/*',
            'aria-label': 'Archivo seleccionado.'
        }
    });

    if (file) {
        const reader = new FileReader;
        reader.onload = (e) => {
            Swal.fire({
                title: 'Tu foto ha sido subida',
                imageUrl: e.target.result,
                imageAlt: 'Tu foto ha sido subida'
            });
            var storageRef = firebase.storage().ref();
            var coverPicsRef = storageRef.child('fotosDenuncias');
            var timestamp = Number(new Date());
            var fileType = file.type.split('/').pop();
            console.log(fileType);
            var fileChild = coverPicsRef.child(timestamp.toString() + '.' + fileType);
            fileChild.put(file).then(function (snapshot) {
                console.log('¡Se cargó una foto de denuncia!');
                document.getElementById('foto').disabled = true;
                fileChild.getDownloadURL().then(function (url) {
                     downloadUrl = url.toString();

                })
            });


        };
        reader.readAsDataURL(file);
    }
    else {
        console.log("error");
    }

}

function clearModalInputs() {
    document.getElementById('tipo').value = "";
    document.getElementById('lugar').value = "";
    document.getElementById('descripcion').value = "";
    document.getElementById('foto').disabled = false;

}
function setLat(lat){
    latitude = lat;
    
}
function setLong(long){
    longitude = long
}
function getLat(){
return latitude;
}
function getLong(){
    return longitude;
}
function addDenuncia() {
    console.log(descripcion.value
        );

    db.collection('denuncias').add({
        sentBy: userUid,
        tipoReporte: tipo.value,
        lugar: new firebase.firestore.GeoPoint(getLat(),getLong()),
        descripcion: descripcion.value,
        estatus: 'Pendiente',
        numComprobaciones: 0,
        pictureURL: downloadUrl,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(a => {
        Swal.fire({
            type: 'success',
            title: 'Denuncia publicada.',
            text: '¡Gracias por tu denuncia, será atendida en breve!'
        });
    });

    hacerDenuncia.setAttribute('data-dismiss', 'modal');

}
function mostrarQuejasPendientes() {

    db.collection('denuncias').where('estatus', '==', 'Pendiente').orderBy('createdAt', 'desc')
                .get()
                .then(querySnapshot => {

                    if (querySnapshot.empty) {
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
window.onload = mostrarQuejasPendientes()
