var userUid;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        
        // User is signed in.
        var userId = user.uid;
        userUid = userId;
        db.collection('users').doc(userId).get().then((doc => {
            var username = document.getElementById('username');
            var poc = document.getElementById('poc');
            var number = document.getElementById('number');
            var gender = document.getElementById('gender');
            var address = document.getElementById('address');

            console.log(doc.data().username);
            

            username.value = doc.data().username;
            number.value = doc.data().phonenumber;
            gender.value = doc.data().gender;
            address.value = doc.data().address;
            poc.innerHTML = `<h3><span class="counter">${doc.data().poc}</span></h3>`;
        }));
    } else {
        // No user is signed in.
        
    }
});

function edit() {
    document.getElementById('username').disabled = false;
    document.getElementById('number').disabled = false;
    document.getElementById('gender').disabled = false;
    document.getElementById('address').disabled = false;
    document.getElementById("botones").style.display = "block";
}

function cancelar() {
    var username = document.getElementById('username');
    var number = document.getElementById('number');
    var gender = document.getElementById('gender');
    var address = document.getElementById('address');
    document.getElementById("botones").style.display = "none";

    username.disabled = true;
    number.disabled = true;
    gender.disabled = true;
    address.disabled = true;

    db.collection('users').doc(userUid).get().then(doc => {
        username.value = doc.data().username;
        number.value = doc.data().phonenumber;
        gender.value = doc.data().gender;
        address.value = doc.data().address;

    })
}