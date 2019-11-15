const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //Get user info
  const email = loginForm['email'].value;
  const password = loginForm['password'].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    console.log(cred.user);
  }).catch(error => {
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
        user.moderador = idTokenResult.claims.moderador;
        user.pyme = idTokenResult.claims.pyme;
        user.ancla = idTokenResult.claims.ancla;

        if(user.moderador){
          location.href = "moderador.html";
        }else if(user.pyme){
          location.href = "pyme-solicitudes.html";
        }else if(user.ancla){
          location.href = "ancla-solicitudes.html";
        }
      });    
    } else {
      // User is signed out.
      // ...
    }
  });
})