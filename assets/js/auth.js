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
        user.administrador = idTokenResult.claims.administrador;

        if(user.normal){     
          if("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                    console.log(position);
                    position.coords.latitude;
                    position.coords.longitude; 
            });
    }       
          window.location.href = "index.html";
        }
        else if(user.administrador){
          location.href = "pendinglist.html";
        }
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
