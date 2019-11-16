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

  
  
}



function logOut() {
    firebase.auth().signOut().then(() => {
        console.log('logged out successfully');
        window.location.href = "login.html";
    });
}
