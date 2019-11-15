var downloadUrl;



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


async function upload() {

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
            var coverPicsRef = storageRef.child('fotoUsuarios');
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
