const auth = firebase.auth();
const db = firebase.firestore();


function goToIndex() {
    window.location = 'index.html';
}

function registrar() {
    var user = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var phonenumber = document.getElementById('number').value;
    var password = document.getElementById('correo').value;
    var confirm_password = document.getElementById('confirm_password').value;
    var gender = document.getElementById('gender').value;
    var address = document.getElementById('address').value;
    var cancel = document.getElementById('cancel').value;
    var register = document.getElementById('register').value;



    if (user != "" && email != "" && phonenumber != "" && password != "" && confirm_password != "" && gender != "" && address != "") {
        auth.createUserWithEmailAndPassword(email, confirm_password).then(user=>{
          const getUid = functions.httpsCallable('getUser');
          getUid({email: email}).then(result =>{
            var uid = result.data;

            const addNormalRole = functions.httpsCallable('addNormalRole');
            addNormalRole({ email: email }).then(result => {})
          })
        })
        db.collection("users").add({
            user: user,
            email: email,
            phonenumber: phonenumber,
            password: password,
            confirm_password: confirm_password,
            gender: gender,
            address: address,
            poc: 15
        })

            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                document.getElementById('nombre').value = "";
                document.getElementById('representante').value = "";
                document.getElementById('telefono').value = "";
                document.getElementById('correo').value = "";
                document.getElementById('razon').value = "";
                document.getElementById('direccion').value = "";
                document.getElementById('empleados').value = "";
                document.getElementById('sucursales').value = "";
                document.getElementById('capacidad').value = "";
                document.getElementById('tipo').value = "";
                document.getElementById('temporalidad').value = "";
                document.getElementById('actividades').value = "";

                Swal.fire({
                    type: 'success',
                    title: 'Registro completo',
                    text: 'Espera a que Agroconecta se ponga en contacto contigo para otorgarte tus credenciales',
                    footer: 'Gracias',
                }).then(result => {
                    location.href = 'index.html';
                })


            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

    }
    else {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Por favor completa todos los campos',
        })
    }

}
