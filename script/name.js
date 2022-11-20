const namelist = document.querySelector('.namelist');

let userCollection = db.collection('users')

const setUser = (user) => {
  if (user) {
    db.collection('users').doc(user.uid).get().then(doc => {
      const data = doc.data();
      const html = `
      <h3 class="name__user"><b>¡Hola!,</b> ${data.firstname} </h3>  
      `; 
      namelist.innerHTML = html;   
    })
  }else{
    namelist.innerHTML = '';
  }
}