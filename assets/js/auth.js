function logIn() {
  //Get user info
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
  console.log('logged in');
  }).catch(error => {
      console.log(error);

    Swal.fire({
      type: 'error',
      title: 'Correo electrónico y/o contraseña incorrectos',
      text: 'Verifica tu información'
    });
  });

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //Si user es verdadero, significa que hay un usuario autenticado
    user.getIdTokenResult().then(idTokenResult => {
        user.normal = idTokenResult.claims.normal;
        //user.administrador = idTokenResult.claims.pyme;

        if(user.normal){            
          window.location.href = "index.html";
        }
        //else if(user.administrador){
          //location.href = "pyme-solicitudes.html";
        //}
      });    
    } else {
      // User is signed out.
    }
  });
  
}



function logOut() {
    firebase.auth().signOut().then(() => {
        console.log('logged out successfully');
        window.location.href = "login.html";
    });
}
