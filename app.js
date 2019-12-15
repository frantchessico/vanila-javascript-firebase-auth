(function() {
    
      const txtEmail = document.getElementById('txtEmail');
      const txtPassword = document.getElementById('txtPassword');
      const btnLogin = document.getElementById('btnLogin');
      const btnSign = document.getElementById('btnSign');
      const btnLogout = document.getElementById('btnLogout');
      const btnGoogle = document.getElementById('btnGoogle');
      const txtPhone = document.getElementById('txtPhone');
      const btnPhone = document.getElementById('btnPhone');
     /// Login with Email And Password
      btnLogin.addEventListener('click', e => {
          e.preventDefault();
          
        const email = txtEmail.value;
        const password = txtPassword.value;
        
        
        
          firebase.auth().onAuthStateChanged((user) => {
            if(user.emailVerified = true ) {
              
             
            } else {
              console.log('O seu email não foi verificado');
              return false;
            }
          });


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


      // Sign in with Email and password:
      btnSign.addEventListener('click', e=> {
          e.preventDefault();

          const email = txtEmail.value;
          const password = txtPassword.value;
          
          firebase.auth().createUserWithEmailAndPassword(email, password)
              .then(function (response) {

                


                  firebase.auth().onAuthStateChanged(function(user) {
                    user.sendEmailVerification(); 
                  });
        
                const email = txtEmail.value;
               firebase.auth().currentUser.sendEmailVerification()
            .then(function () {
               console.log('Enviamos um email pra voce')
            }).catch(function (error) {
                
            });


            
                btnLogout.style.display = 'block';
                btnLogin.style.display = 'none';
                btnSign.style.display = 'none';
                console.log(response)
              })
              .catch(function (error) {
                console.log(error)
              });
      });

      // Auth Phone and password:
      btnPhone.addEventListener('click', e => {
        e.preventDefault();
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign- in-button', { 
          'size': 'invisible', 
          'callback': function(response) { 
          
          onSignInSubmit(); 
          } 
          });   
          
          firebase.auth().signInWithPhoneNumber(txtPhone.value, window.recaptchaVerifier) 
            .then((confirmationResult) => { 
            // At this point SMS is sent. Ask user for code. 
            alert('A confirmation message was just sent.');
            var code = window.prompt('Please enter the 6 digit code'); 
            return confirmationResult.confirm(code); 
            }).then((result) => { 
            console.log(result); 
            // User is now signed in and accessible via result.user. 
            }).catch((error) => { 
            // Error occurred. 
            }); 
        
      })
  
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