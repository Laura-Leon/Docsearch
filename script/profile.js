//Profile es cart

const list = document.querySelector('.profileList');

const checkoutForm = document.querySelector('.checkout__form');


renderProfile = () => {
  profile.forEach((data) => {
    const card = document.createElement('div');

    card.classList.add('card');
    card.innerHTML = `
    <div class="Profcontainer">
            <div class="card__info">
             <h3 class=" =profile__title">
        ${data.title}
         </h3>

        <h8 class="profile__price"><b>Autor</b> ${data.author}</h8> <br>
        <h8 class="profile__price"><b>Año</b> ${data.year}</h8> <br>
        <a href="${data.link}" target="_blank" >Click para ir a la página</a> <br>
        <h8 class="profile__price"> <b>Fuente</b> ${data.source}</h8> <br>
        <h8 class="profile__price"><b>Palabras clave</b> ${data.keyword}</h8> <br>
        <h8 class="profile__price"><b>Departamento</b> ${data.department}</h8> <br>
        <h8 class="profile__price"><b>Estado</b> ${data.cardstatus}</h8> <br>
        </div>
        
        <button class ="profile__deleteBtn"><img class="card__img", src="images/delete.svg"alt=""></button>
      <div class="line"></div>
    `;
    list.appendChild(card);

    //deletebutton
    const deleteBtn = card.querySelector('.profile__deleteBtn');
    deleteBtn.addEventListener('click', function () {
      //delete element
      db.collection('profile').doc(data.id).delete()
        .then(() => {
          console.log("Document successfully deleted!");
          console.log(data.id);


        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
    });


  });



}