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

    const status = [];

    if (status.length > 0) {
        
        cardsCollection = cardsCollection.where('cardstatus', 'in', status);
        console.log(status);
    }


    if (filters.year.value) {
        switch (filters.year.value) {
            case '0':
                cardsCollection = cardsCollection.where('year', '<', 1960);
                break;
            case '1':
                cardsCollection = cardsCollection.where('year', '>=', 1960);
                cardsCollection = cardsCollection.where('year', '<', 1980);

                break;
            case '2':
                cardsCollection = cardsCollection.where('year', '>=', 1980);
                break;
        }

    }



    if (filters.department.value) {
        cardsCollection = cardsCollection.where('department', '==', filters.department.value);
    }


    if (filters.order.value) {
        switch (filters.order.value) {
            case 'year_asc':
                cardsCollection = cardsCollection.orderBy('year', 'asc');
                break;
            case 'year_desc':
                cardsCollection = cardsCollection.orderBy('year', 'desc');
                break;
            case 'Alpha':
                if (filters.year.value) {
                    cardsCollection = cardsCollection.orderBy('year', 'asc');
                }
                cardsCollection = cardsCollection.orderBy('title', 'asc');
                break;
        }
    }

    cardsCollection.get().then(handleCollectionResult);
});


let cardsCollection = db.collection('cards')
const params = new URLSearchParams(location.search);
if (params.get('cardstatus')) {
    cardsCollection = cardsCollection.where('cardstatus', '==', params.get('cardstatus'));
}
if (params.get('department')) {
    cardsCollection = cardsCollection.where('department', '==', params.get('department'));
}

cardsCollection.get().then(handleCollectionResult);
