function goToIndex() {
    window.location = 'index.html';
}

function registrar() {
    console.log('hola');

    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var phonenumber = document.getElementById('number').value;
    var password = document.getElementById('password').value;
    var confirm_password = document.getElementById('confirm_password').value;
    var gender = document.getElementById('gender').value;
    var address = document.getElementById('address').value;
    var cancel = document.getElementById('cancel').value;
    var register = document.getElementById('register').value;



    if (username != "" && email != "" && phonenumber != "" && password != "" && confirm_password != "" && gender != "" && address != "") {
        
        auth.createUserWithEmailAndPassword(email, confirm_password).then(user=>{
          const getUid = functions.httpsCallable('getUser');
          getUid({email: email}).then(result =>{
            var uid = result.data;

            const addNormalRole = functions.httpsCallable('addNormalRole');
            addNormalRole({ email: email }).then(result => {});
            console.log(username);
            
            db.collection("users").doc(uid).set({
                username: username,
                phonenumber: phonenumber,
                gender: gender,
                address: address,
                poc: 15
            })
    
                .then(() => {
                    user.value = "";
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
                        location.href = 'login.html';
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
