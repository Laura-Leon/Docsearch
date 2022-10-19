const listview = document.querySelector('.orderlist');



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
    
    <button class ="profile__deleteBtn"><img class="card__img", src="images/delete.svg"alt=""></button>
    <button class ="profile__addBtn"> "agregar ficha"</button>

  <div class="line"></div>
       

   </div>
        `;

        listview.appendChild(customer);
          //deletebutton
          const deleteBtn = customer.querySelector('.profile__deleteBtn');
          deleteBtn.addEventListener('click', function () {
              //delete element
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