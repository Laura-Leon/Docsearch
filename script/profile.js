//Profile es cart

const list = document.querySelector(".profileList");

const checkoutForm = document.querySelector(".checkout__form");

renderProfile = () => {
  profile.forEach((data) => {
    const card = document.createElement("div");

    card.classList.add("card");
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
    const deleteBtn = card.querySelector(".profile__deleteBtn");
    deleteBtn.addEventListener("click", function () {
      //delete element
      const docRef = db.collection("profile").doc(loggedUser.uid);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const prof = doc.data().profile
            const filteredProf = prof.filter(item => item.id != data.id)
            docRef.update({profile: filteredProf})
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    });
  });
};
