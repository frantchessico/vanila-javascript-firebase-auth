(function() {
    
      const txtEmail = document.getElementById('txtEmail');
      const txtPassword = document.getElementById('txtPassword');
      const btnLogin = document.getElementById('btnLogin');
      const btnSign = document.getElementById('btnSign');
      const btnLogout = document.getElementById('btnLogout');
      const btnGoogle = document.getElementById('btnGoogle');

      btnLogin.addEventListener('click', e => {
          e.preventDefault();
        const email = txtEmail.value;
        const password = txtPassword.value;

        const auth = firebase.auth();
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (response) {
                btnLogout.style.display = 'block';
                btnLogin.style.display = 'none';
                btnSign.style.display = 'none';
        console.log(response)
            })
            .catch(function (error) {
        console.log(error) 
            });
      });

      btnSign.addEventListener('click', e=> {
          e.preventDefault();

          const email = txtEmail.value;
          const password = txtPassword.value;

          firebase.auth().createUserWithEmailAndPassword(email, password)
              .then(function (response) {
                btnLogout.style.display = 'block';
                btnLogin.style.display = 'none';
                btnSign.style.display = 'none';
                console.log(response)
              })
              .catch(function (error) {
                console.log(error)
              });
      });
  
      btnGoogle.addEventListener('click', e => {
        e.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
              btnLogout.style.display = 'block';
              btnLogin.style.display = 'none';
              btnSign.style.display = 'none';
              console.log(result)
            })
            .catch(function (error) {
              console.log(error)
            });
      })

      btnLogout.addEventListener('click', e => {
        e.preventDefault();
        firebase.auth().signOut()
            .then(function () {
              btnLogout.style.display = 'none';
              btnLogin.style.display = 'block';
              btnSign.style.display = 'block';
            }).catch(function (error) {
               console.log('Error: ',error)
            });
      })
})()