const uslist = document.querySelector('.userlist');

let userCollection = db.collection('users')

const setUser = (user) => {
  if (user) {
    db.collection('users').doc(user.uid).get().then(doc => {
      const data = doc.data();
      const html = `
      <h3 class="card__price"><b>Nombre:</b> ${data.firstname} ${data.lastname}</h3>  
      `; 
      uslist.innerHTML = html;   
    })
  }else{
    uslist.innerHTML = '';
  }
}

