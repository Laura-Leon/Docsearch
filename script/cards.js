const list = document.querySelector('.list');


const handleCollectionResult = (querySnapshot) => {
    list.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const card = document.createElement('div');
       
        card.innerHTML = `
        <div class="Prodcontainer">
  
            <div class="card__info">
             <h1 class=" =card__title">
        ${data.title}
         </h1>

        <h3 class="card__price"><b>Autor:</b> ${data.author}</h3>
        <h3 class="card__price"><b>Año:</b> ${data.year}</h3>
       
        <h3 class="card__price"><b>Fuente:</b> ${data.source}</h3>
        <h3 class="card__price"><b>Palabras clave:</b> ${data.keyword}</h3>
        <h3 class="card__price"> <b>Departamento:</b> ${data.department}</h3>
        <h3 class="card__price"><b>Estado:</b> ${data.cardstatus}</h3>
        <a href="${data.link}" target="_blank" ><b>Click para ver info completa</b></a>
        </div>
       

        <button class= "card__profileBtn">Agregar a favoritos</button>
        <button class ="card__deleteBtn hidden showLoggedAdmin"><img class="card__img", src="images/delete.svg"alt=""></button>
   </div>
        `;

        list.appendChild(card);

        //deletebutton
        const deleteBtn = card.querySelector('.card__deleteBtn');
        deleteBtn.addEventListener('click', function () {
            //delete element
            db.collection('cards').doc(doc.id).delete()
                .then(() => {
                    console.log("Document successfully deleted!");

                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
        });
        //
        const profileBtn = card.querySelector('.card__profileBtn');
        profileBtn.addEventListener('click', function () {
            addToMyProfile({
                ...data,
                id: doc.id,
            });
        });
    });
}

const filters = document.querySelector('.filters');

filters.addEventListener('change', function () {

    let cardsCollection = db.collection('cards');
    if (filters.cardstatus.value) {
        cardsCollection = cardsCollection.where('cardstatus', '==', filters.cardstatus.value);
    }

    const cardstatuss = [];

    if (cardstatuss.length > 0) {
        cardsCollection = cardsCollection.where('cardstatus', 'in', cardstatuss);
    }


    if (filters.year.value) {
        switch (filters.year.value) {
            case '0':
                cardsCollection = cardsCollection.where('year', '<', 1940);
                break;
            case '1':
                cardsCollection = cardsCollection.where('year', '>=', 1940);
                cardsCollection = cardsCollection.where('year', '<', 1960);

                break;
            case '2':
                cardsCollection = cardsCollection.where('year', '>=', 1960);
                break;
        }

    }

    if (filters.department.value) {
        cardsCollection = cardsCollection.where('department', '==', filters.department.value);
    }


    if (filters.order.value) {
        switch (filters.order.value) {
            case 'price_asc':
                cardsCollection = cardsCollection.orderBy('price', 'asc');
                break;
            case 'price_desc':
                cardsCollection = cardsCollection.orderBy('price', 'desc');
                break;
            case 'Alpha':
                if (filters.price.value) {
                    cardsCollection = cardsCollection.orderBy('price', 'asc');
                }
                cardsCollection = cardsCollection.orderBy('name', 'asc');
                break;
        }
    }
    cardsCollection.get().then(handleCollectionResult);
});


let cardsCollection = db.collection('cards')
const params = new URLSearchParams(location.search);
if (params.get('department')) {
    cardsCollection = cardsCollection.where('department', '==', params.get('department'));
}
if (params.get('pokecollection')) {
    cardsCollection = cardsCollection.where('pokecollection', '==', params.get('pokecollection'));
}
cardsCollection.get().then(handleCollectionResult);
