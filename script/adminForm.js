const cardForm = document.querySelector('.cardForm');
const cardFormSuccess = document.querySelector('.cardForm__success');
const cardFormLoading = document.querySelector('.cardForm__loading');
const cardFormError = document.querySelector('.cardForm__error');
const cardFormImages = document.querySelector('.cardForm__images');

const imageFiles = [];

cardForm.cardstatus.addEventListener('change', function () {
    console.log(cardForm.cardstatus.value);
})

//esta es una prueba, recosdar que no voy a agregar imagenes 

cardForm.image.addEventListener('change', function () {
    const file = cardForm.image.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
        const cardFormImg = document.createElement('img');
        cardFormImg.classList.add('cardForm__img');
        cardFormImg.setAttribute('src', event.target.result);
        cardFormImages.appendChild(cardFormImg);
    }

    reader.readAsDataURL(file);
    imageFiles.push(file);
});
//eventos de cada uno de los botones que deben fucnionar para agregar nuevas fichas al documento 

cardForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const card = {
        author: cardForm.author.value,
        year: cardForm.year.value,
        //price: parseFloat(cardForm.price.value),
        title: cardForm.title.value,
        source: cardForm.source.value,
        link: cardForm.link.value,
        keyword: cardForm.keyword.value,
        department: cardForm.department.value,
        lat: cardForm.lat.value,
        long: cardForm.long.value,
        cardstatus: cardForm.cardstatus.value,
        //sizes: [],

    };


    if (!card.author) {
        cardFormError.innerText = 'Necesitas ponerle nombre al autor de la obra';
        cardFormError.classList.remove('hidden');
        return;
    }
    if (!card.year) {
        cardFormError.innerText = 'Necesitas poner el año de publicaciòn de la obra';
        cardFormError.classList.remove('hidden');
        return;
    }
    if (!card.title) {
        cardFormError.innerText = 'Necesitas agregar un título a la obra';
        cardFormError.classList.remove('hidden');
        return;
    }
    if (!card.source) {
        cardFormError.innerText = 'Necesitas agregar la fuente, revista, universidad, o instituto de donde viene la obra a la obra';
        cardFormError.classList.remove('hidden');
        return;
    } if (!card.link) {
        cardFormError.innerText = 'Necesitas agregar un link del lugar donde está alojada la obra (base de datos, pagina web, etc...';
        cardFormError.classList.remove('hidden');
        return;
    }
    if (!card.keyword) {
        cardFormError.innerText = 'Necesitas agregar al menos un keyword';
        cardFormError.classList.remove('hidden');
        return;
    }
    if (!card.department) {
        cardFormError.innerText = 'Necesitas agregar el departamento del que habla el texto o un departamento aproximado';
        cardFormError.classList.remove('hidden');
        return;
    }
    if (!card.lat) {
        cardFormError.innerText = 'Necesitas agregar la latitud en grados decimales del departamento seleccionado';
        cardFormError.classList.remove('hidden');
        return;
    }
    if (!card.long) {
        cardFormError.innerText = 'Necesitas agregar la longuitud en grados decimales del departamento seleccionado';
        cardFormError.classList.remove('hidden');
        return;
    }
    if (!card.cardstatus) {
        cardFormError.innerText = 'Necesitas agregar en que estado se encuentra el documento, si está disponible en linea o en una biblioteca física';
        cardFormError.classList.remove('hidden');
        return;
    }
    console.log(card);

  
    console.log(cardForm.image.files);
    console.log(imageFiles);

    cardFormLoading.classList.remove('hidden');
    cardFormError.classList.add('hidden');

    const genericCatch = function (error) {
        cardFormLoading.classList.add('hidden');
        cardFormError.classList.remove('hidden');
        cardFormError.innerHTML = "Ocurrió un error al subir la ficha";
    }

    //espera a subir la información al firestore
    db.collection("cards").add(card)
        .then(function (docRef) {

            const uploadPromises = [];
            const downloadUrlpromises = [];

            imageFiles.forEach(function (file) {
                var storageRef = firebase.storage().ref();
                var fileRef = storageRef.child(`cards/${docRef.id}/${file.author}`);
                //esperamos a subir la imagen
                uploadPromises.push(fileRef.put(file));
            });
            Promise.all(uploadPromises).then(function (snapshots) {
                snapshots.forEach(function (snapshot) {

                    //esperamos a tener url de descarga de la imagen
                    downloadUrlpromises.push(snapshot.ref.getDownloadURL());
                });

                Promise.all(downloadUrlpromises).then(function (downloadURLs) {
                    const images = [];
                    downloadURLs.forEach(function (url, index) {
                        images.push({
                            url: url,
                            ref: snapshots[index].ref.fullPath
                        });
                    });

                    console.log(downloadURLs);
                    db.collection('cards').doc(docRef.id).update({
                        images: images
                    }).then(function () {
                        cardFormLoading.classList.add('hidden');
                        cardFormSuccess.classList.remove('hidden');

                    })
                        .catch(genericCatch);;
                })
                    .catch(genericCatch);;
            })
                .catch(genericCatch);
        })
        .catch(genericCatch);
});
const checkcardFormAdmin = () => {
    if (!loggedUser || !loggedUser.admin) {
        location.href = '/cards.html';
    }
}
console.log(loggedUser);