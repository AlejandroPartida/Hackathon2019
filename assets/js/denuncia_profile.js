var downloadUrl;
const tipoReporte = document.getElementById('tipo');
const lugar = document.getElementById('lugar');
const descripcion = document.getElementById('descripcion');
const hacerDenuncia = document.getElementById('denuncia');


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

function addDenuncia() {
    console.log(descripcion.value
        );

    db.collection('denuncias').doc(userUid).set({
        sentBy: userUid,
        tipoReporte: tipoReporte.value,
        lugar: lugar.value,
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
