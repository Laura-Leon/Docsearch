const firebaseConfig = {
    apiKey: "AIzaSyC5nnFcT7m67DzgBazG8T7YGt74ejitaus",
    authDomain: "docsearch-6d627.firebaseapp.com",
    projectId: "docsearch-6d627",
    storageBucket: "docsearch-6d627.appspot.com",
    messagingSenderId: "121820873502",
    appId: "1:121820873502:web:360d7c9ac791fa9be13f0f",
    measurementId: "G-2NKTTSPGL9"
  };

  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();
  const storage = firebase.storage();
  
  let loggedUser = null;
  
  const setLoggedUser = (info, id) => {
    loggedUser = info;
    loggedUser.uid = id;
    userAuthChanged(true);
    if(typeof checkProductFormAdmin !== 'undefined') checkProductFormAdmin();
  }
  /*
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection('users').doc(user.uid).get().then(function (doc) {
        if(!doc.data()) return;
        setLoggedUser(doc.data(), user.uid);
      });
      getMyCart(user.uid);
    } else {
      loggedUser = null;
      cart = [];
      userAuthChanged(false);
    }
  });
  
  let cart = [];
  const cartBtnNumber = document.querySelector('.cartBtn span');
  const CART_COLLECTION = db.collection('cart');
  const ORDERS_COLLECTION = db.collection('orders');
  
  const addToMyCart = (product) => {
    cart.push(product);
    CART_COLLECTION.doc(loggedUser.uid).set({
      cart,
    });
    cartBtnNumber.innerText = cart.length;
  };
  
  let renderCart = null;
  
  const getMyCart = (uid) => {
    CART_COLLECTION.doc(uid).get().then(snapShot => {
      const data = snapShot.data();
      if(!data) return;
      if(cartBtnNumber) cartBtnNumber.innerText = data.cart.length;
      cart = data.cart;
      if(renderCart) renderCart();
    });
  }
  */