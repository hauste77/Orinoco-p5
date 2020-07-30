let url = 'http://localhost:3000/api/teddies/';

// ******************
// Version hard avec Promise (BONNE PRATIQUE)
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise

// let proms = [];

// on parse l'objet de produit acheté par le client
// on fetch chaque produit
// le fetch retourne la reponse d'une Promise qu'on stock dans un tableau

// Object.entries( cartItems )
//    .forEach( ( [ key, v ] ) => proms.push( fetch( url + key ) ) );

// Si toutes les reponses sont resolved
// la res correspond a un tableau des reponses de chaque Promise == [ Response, ... ]
// On parse ce tableau avec un forEach classique
// Pour chaque reponse "p", on applique la fonction json() qui retourne une promise
// On applique .then() sur chaque promise pour recuperer la data que nous retournes...
// la Promise json

// Promise.all( proms )
//    .then( res => 
//       res.forEach( p => {
//          p.json().then( d => {
//             // exploiter ici
//          } );
//       } )
//    );

// ******************
// Version simple mais mauvaise pratique puisque tu GET tous les produits

// let ids = [];
// // On stocke juste les id dans un tableau
// Object.entries(cartItems)
//    .forEach(([key, v]) => ids.push(key));


// on fetch tous les produits
// on applique la fonction json qui retourne une promise avec la donnee
// on filtre la donnee ( objet contenant tous les articles )
// on verifie que l'id de l'article se trouve dans le tableau des produits acheter...
// ... par l'utilisateur
// si c'est le cas, filter renvoie l'article et le stock dans data.
// fetch(url).then(res =>
//    res.json()).then(d => {
//    d = d.filter(o => ids.includes(o._id));
   
//    // exploiter ici
   

// });

function calcCartPrice() {
   let tmp = 0;
   const elTotaleP = document.querySelector("#totale-panier"),
      elsTotal = document.querySelectorAll( ".total" );
   
   elsTotal.forEach( e => tmp += parseInt( e.innerText ) );
    elTotaleP.innerText = `${tmp} $`;
}

function addTeddy(id, teddy) {
   const tmp = document.querySelector("#product-item");
   let clone = document.importNode( tmp.content.children[ 0 ] , true);

   const elQuantity = clone.querySelector(".quantity"),
      elTotal = clone.querySelector(".total")
      elTitle = clone.querySelector(".title-panier"),
      elPrice = clone.querySelector(".price"),
      elTotale = clone.querySelector("#totale-panier"),
      elBtn = clone.querySelector(".remove");

   elBtn.id = id;
   elBtn.onclick = deleteItemFromCart.bind( this, id );
   elQuantity.innerText = teddy.qt;
   elTotal.innerText = teddy.price * teddy.qt + " $";
   elTitle.innerText = teddy.name;
   elPrice.innerText = teddy.price + " $";


   return clone;
}

//var total = 0;

// function qui cree le tableau panier
function updateProducts() {
   const cartItems = JSON.parse(localStorage.getItem("cartItems"));
      container = document.querySelector("#products");
      
   container.innerHTML = '';
   Object.entries(cartItems)
   .forEach(([key, v]) => {
      const elTeddy = addTeddy(key, v);
      container.append( elTeddy );
   });
}

function deleteItemFromCart( id ) {
   const cartItems = JSON.parse(localStorage.getItem("cartItems"));

   cartItems[ id ].qt > 1
      ? cartItems[ id ].qt -= 1
      : delete cartItems[ id ];

   localStorage.setItem( "cartItems", JSON.stringify( cartItems ) )
   updateProducts();
   updateCartNb();
}

updateProducts();
// function qui calcule le cout total du panier
calcCartPrice();

   

