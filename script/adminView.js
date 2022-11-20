const listview = document.querySelector('.orderlist');
const adminSuccess = document.querySelector('.admin__success');
const adminLoading = document.querySelector('.admin__loading');
const adminError = document.querySelector('.admin__error');

const handleAdminCollectionResults = (querySnapshot) => {
    
    
    listview.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const customer = document.createElement('div');

        customer.innerHTML = `
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
    <section class ="admin__btns">
    <button class ="admin__deleteBtn"><img class="card__img", src="images/delete.svg"alt=""></button>
    <button class ="admin__addBtn">Agregar ficha</button>
    </section>
  <div class="line"></div>
       
   </div>
        `;

        listview.appendChild(customer);
          //deletebutton
  const deleteBtn = customer.querySelector('.admin__deleteBtn');
  deleteBtn.addEventListener('click', function (event) {
    event.preventDefault();
        
      //delete element
      db.collection('orders').doc(doc.id).delete()
          .then(() => {
              console.log("Document successfully deleted!");

          }).catch((error) => {
              console.error("Error removing document: ", error);
          });
  });
      

        //espera a subir la información al firestore
   

        const addBtn = customer.querySelector('.admin__addBtn');

        addBtn.addEventListener('click', function (event) {
            event.preventDefault();
        
            const card = {
                author: data.author,
                year: parseFloat(data.year),
                //price: parseFloat(admin.price.value),
                title: data.title,
                source: data.source,
                link: data.link,
                keyword: data.keyword,
                department: data.department,
                lat: data.lat,
                long: data.long,
                cardstatus: data.cardstatus,
        
            };
        
        
    if (!card.author) {
        adminError.innerText = 'Necesitas ponerle nombre al autor de la obra';
        adminError.classList.remove('hidden');
        return;
    }
    if (!card.year) {
        adminError.innerText = 'Necesitas poner el año de publicaciòn de la obra';
        adminError.classList.remove('hidden');
        return;
    }
    if (!card.title) {
        adminError.innerText = 'Necesitas agregar un título a la obra';
        adminError.classList.remove('hidden');
        return;
    }
    if (!card.source) {
        adminError.innerText = 'Necesitas agregar la fuente, revista, universidad, o instituto de donde viene la obra a la obra';
        adminError.classList.remove('hidden');
        return;
    } if (!card.link) {
        adminError.innerText = 'Necesitas agregar un link del lugar donde está alojada la obra (base de datos, pagina web, etc...';
        adminError.classList.remove('hidden');
        return;
    }
    if (!card.keyword) {
        adminError.innerText = 'Necesitas agregar al menos un keyword';
        adminError.classList.remove('hidden');
        return;
    }
    if (!card.department) {
        adminError.innerText = 'Necesitas agregar el departamento del que habla el texto o un departamento aproximado';
        adminError.classList.remove('hidden');
        return;
    }
    if (!card.lat) {
        adminError.innerText = 'Necesitas agregar la latitud en grados decimales del departamento seleccionado';
        adminError.classList.remove('hidden');
        return;
    }
    if (!card.long) {
        adminError.innerText = 'Necesitas agregar la longuitud en grados decimales del departamento seleccionado';
        adminError.classList.remove('hidden');
        return;
    }
    if (!card.cardstatus) {
        adminError.innerText = 'Necesitas agregar en que estado se encuentra el documento, si está disponible en linea o en una biblioteca física';
        adminError.classList.remove('hidden');
        return;
    }
        
            adminLoading.classList.remove('hidden');
            adminError.classList.add('hidden');
          

            const genericCatch = function (error) {
                adminLoading.classList.add('hidden');
                adminError.classList.remove('hidden');
                adminError.innerHTML = "Ocurrió un error al subir la ficha";
            }
        
            //espera a subir la información al firestore
            db.collection("cards").add(card)
                .then(function (docRef) {
                    adminLoading.classList.add('hidden');
                    adminSuccess.classList.remove('hidden');
            
                })
                .catch(genericCatch);
// a ver si tambein se borra jijij
                db.collection('orders').doc(doc.id).delete()
                .then(() => {
                    console.log("Document successfully deleted!");


                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
        
        });

        
    });
}


let ordersCollections = db.collection('orders')
const params = new URLSearchParams(location.search);

ordersCollections.get().then(handleAdminCollectionResults);