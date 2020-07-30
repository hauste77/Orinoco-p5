let url = 'http://localhost:3000/api/teddies/'

const urlParams = new URLSearchParams(window.location.search),
   id = urlParams.get("id");

fetch(url + id).then((response) =>
   response.json().then((data) => {
      const elTitle = document.querySelector(".title"),
         elImg = document.querySelector(".img"),
         elPrice = document.querySelector(".price-detail"),
         elDesc = document.querySelector(".description-detail"),
         elBtn = document.querySelector(".btn");
      elTitle.innerText = data.name;
      elDesc.innerText = data.description;
      elImg.src = data.imageUrl;
      elPrice.innerText = data.price + ' $';
      elBtn.onclick = addItemToCart.bind( null, id, data.price, data.name ); // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function/bind
   })
);

function addItemToCart( id, price, name ) {
   const cartItems = JSON.parse( localStorage.getItem("cartItems") );
   //   cartItem = cartItems[ id ] || 0;
  // cartItems[ id ] = cartItem + 1;
  
   cartItems[ id ] = { name: name, qt:cartItems[id] !== undefined ? cartItems[id].qt + 1 : 1, price: price }; // operateur ternaire
   localStorage.setItem( "cartItems", JSON.stringify( cartItems ) );
   updateCartNb();
   return false;
   
}



// cartItem = cartItems[ id ] || 0;
//
// if ( cartItems[ id ] ) {
//    cartItem = cartItems[ id ]
// } else {
//    cartItem = 0;
// }


// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean

// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Op%C3%A9rateurs_logiques

// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/L_op%C3%A9rateur_conditionnel