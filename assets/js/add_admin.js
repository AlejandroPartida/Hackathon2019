function goToIndex() {
    window.location = 'index.html';
}

function registrar() {
    console.log('hola');

    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phonenumber = document.getElementById('number').value;
    var password = document.getElementById('password').value;
    var confirm_password = document.getElementById('confirm_password').value;
    var gender = document.getElementById('gender').value;
    var address = document.getElementById('address').value;
    var cancel = document.getElementById('cancel').value;
    var register = document.getElementById('register').value;




    if (username != "" && email != "" && phonenumber != "" && password != "" && confirm_password != "" && gender != "" && address != "") {

        auth.createUserWithEmailAndPassword(email, confirm_password).then(user => {
            const getUid = functions.httpsCallable('getUser');
            getUid({ email: email }).then(result => {
                var uid = result.data;

                const addAdministratorRole = functions.httpsCallable('addAdministratorRole');
                addAdministratorRole({ email: email }).then(result => { });
                console.log(username);

                db.collection("users").doc(uid).set({
                    username: username,
                    name: name,
                    phonenumber: phonenumber,
                    gender: gender,
                    gender: rol,
                    address: address,
                    rol: 'administrador',
                    profilePicURL : 'https://firebasestorage.googleapis.com/v0/b/hackathon2019-b9401.appspot.com/o/fotosDenuncias%2F1573907114343.png?alt=media&token=eb788852-f7bd-4187-8845-fbf56008d2f6'

                })

                    .then(() => {
                        user.value = "";
                        name.value = "";
                        email.value = "";
                        phonenumber.value = "";
                        gender.value = "";
                        address.value = "";


                        Swal.fire({
                            type: 'success',
                            title: 'Registro completo',
                            text: 'Te has registrado con éxito.',
                            footer: 'Gracias',
                        }).then(result => {
                            location.href = 'add_admin.html';
                        })


                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });

            });


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



db.collection('users').where('rol', "==", "administrador")
    .get()
    .then(querySnapshot => {

        console.log(querySnapshot.empty);
        if (querySnapshot.empty) {
            list.innerHTML = '<h3> No existen usuarios </h3>'
        }
        else {
            querySnapshot.forEach(doc => {
                list.innerHTML += `
                 <tr>
                <th scope="row">1</th>
                <td>${doc.data().username}</td>
                <td>${doc.data().name}</td>
                <td><button type="button" class="btn btn-warning"><i
                            class="fa fa-edit"></i></button></td>
                <td><button type="button" class="btn btn-danger"><i
                            class="fa fa-trash "></i></button></td>
            </tr>
       
                    `

            })
        }

    })
