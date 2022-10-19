//Profile es cart

const list = document.querySelector('.profileList');

const checkoutForm = document.querySelector('.checkout__form');


renderProfile = () => {
  profile.forEach((data) => {
    const card = document.createElement('div');
    //let img = data.images[0]?.url;
  /*  if(!img) {
      img = './images/placeholder-image.png';
    }*/
    card.classList.add('card');
    card.innerHTML = `
    <div class="Prodcontainer">
            <div class="card__info">
             <h1 class=" =card__title">
        ${data.title}
         </h1>
        <h3 class="card__price">${data.author}</h3>
        <h3 class="card__price">${data.year}</h3>
        <a href="${data.link}" target="_blank" >Click para ir a la página</a>
        <h3 class="card__price">${data.source}</h3>
        <h3 class="card__price">${data.keyword}</h3>
        <h3 class="card__price">${data.department}</h3>
        <h3 class="card__price">${data.cardstatus}</h3>
        </div>
        
        <button class ="profile__deleteBtn"><img class="card__img", src="images/delete.svg"alt=""></button>
      <div class="line"></div>
    `;
    list.appendChild(card);
   
    
  });


  
}