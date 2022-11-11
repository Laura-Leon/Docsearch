const authModal = document.createElement('section');
authModal.classList.add('modal');
authModal.innerHTML = `
<div class="modal__backdrop"></div>
    <article class="modal__content">
        <button class="modal__close">Cerrar</button>
        <form class="authform">
          <div class="card__login">
          <div class="labels__login">
          <label class="authform__regfield productForm__label">
          Nombre
          <br>
          <input class="productForm__input" type="text" name="firstname"><br><br>
      </label>
      <label class="authform__regfield productForm__label">
      Apellido
      <br>
      <input class="productForm__input" type="text" name="lastname"><br><br>
  </label>
      <label class="productForm__label">
          Email
          <br>
          <input class="productForm__input" type="email" name="email"><br><br>
      </label>
      <label class="productForm__label">
          Password
          <br>
          <input class="productForm__input" type="password" name="password"><br><br>
      </label>
          </div>

      <button type="submit" class="authform__submit">Enviar</button>
          </div>
        </form>
    </article>
    `;

    document.body.appendChild(authModal);

    const authForm = authModal.querySelector('.authform');
    const regFields = authForm.querySelectorAll('.authform__regfield');
    const modalError = authForm.querySelector('.productForm__error');
    let isLogin = true;
    const authModalContent = authModal.querySelector('.modal__content');
    const closeModal = authModal.querySelector('.modal__close');
    
    function handleGoToLogin () {
      regFields.forEach(function (elem) {
        elem.classList.add('hidden');
      });
      isLogin = true;
    }
    
    handleGoToLogin();
    
    authForm.addEventListener('submit', function (event) {
      event.preventDefault();
      console.log('submit');
    
      const firstname = authForm.firstname.value;
      const lastname = authForm.lastname.value;
      const email = authForm.email.value;
      const password = authForm.password.value;
    
      if(isLogin) {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(() => {
            handleCloseModal();
            location.href = 'cards.html';
          })
          .catch((error) => {
            modalError.innerText = error.message;
          });
      } else {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log(user);
    
            const userDoc = {
              firstname,
              lastname: lastname,
              email: email,
            };
            db.collection('users').doc(user.uid).set(userDoc).then(() => {
              setLoggedUser(userDoc, user.uid);
              handleCloseModal();
              location.href = 'cards.html';
          })
          .catch((error) => {
              console.error("Error writing document: ", error);
          });
          })
          .catch((error) => {
            modalError.innerText = error.message;
          });
      }
    });
    
    
    const authButtons = document.querySelectorAll('.authButtons');

    authButtons.forEach((element)=>{
      element.innerHTML = `<button class="authButtons__logout showLoggedIn">Logout</button>`;
    });

    
    const authLogin = document.querySelectorAll('.boton_personalizado');
    const authRegister = document.querySelectorAll('.boton_personalizado2');
    const authLogout = document.querySelectorAll('.authButtons__logout');
    
    function handleModalAppear () {
      authModal.style.opacity = 1;
      authModalContent.style.transform = 'translate(0px, 0px)';
    }
    
    authLogin.forEach((e)=>{
      e.addEventListener('click', function () {
        authModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        handleGoToLogin();
        setTimeout(handleModalAppear, 1);
      });
    })

    authRegister.forEach((e)=>{
      e.addEventListener('click', function () {
        authModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        regFields.forEach(function (elem) {
          elem.classList.remove('hidden');
        });
        isLogin = false;
        setTimeout(handleModalAppear, 1);
      });
    })
   
    
    function handleCloseModal () {
      authModal.style.opacity = 0;
      authModalContent.style.transform = 'translate(0px, -500px)';
      document.body.style.overflow = 'hidden scroll';
      setTimeout(function () {
        authModal.style.display = 'none';
      }, 500);
    }
    
    authLogout.forEach((element)=>{
      element.addEventListener('click', function() {
        firebase.auth().signOut();
      location.href = 'login.html';

      });
    })
   

    closeModal.addEventListener('click',function(){
      authModal.style.opacity = 0;
      authModalContent.style.transform = 'translate(0px, -500px)';
      document.body.style.overflow = 'hidden scroll';
      setTimeout(function () {
        authModal.style.display = 'none';
      }, 500);

    })