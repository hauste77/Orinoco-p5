const url = `${config.apiBase}/api/teddies`;

// fonction que je vais appeler pour récupérer mon totale pour la page confirmation

function getCartPrice() {
   return parseInt(
      document.querySelector("#totale-panier").innerText
   );
}

// fonction qui calcule le totale par ligne et le totale panier

function updateCartPrice() {
   let tp = 0;
   const elTotaleP = document.querySelector("#totale-panier"),
      elsTotal = document.querySelectorAll(".total");

   elsTotal.forEach(e => tp += parseInt(e.innerText) );
   elTotaleP.innerText = `${tp} $`;
}

// Fonction qui ajoute les élément sectionnée dans mon Template

function addTeddy(id, teddy) {
   const tmp = document.querySelector("#product-item");
   let clone = document.importNode(tmp.content.children[0], true);

   const elQuantity = clone.querySelector(".quantity"),
      elTotal = clone.querySelector(".total")
   elTitle = clone.querySelector(".title-panier"),
      elPrice = clone.querySelector(".price"),
      elTotale = clone.querySelector("#totale-panier"),
      elBtn = clone.querySelector(".remove");

   elBtn.id = id;
   elBtn.onclick = deleteItemFromCart.bind(null, id);
   elQuantity.innerText = teddy.qt;
   elTotal.innerText = teddy.price * teddy.qt + " $";
   elTitle.innerText = teddy.name;
   elPrice.innerText = teddy.price + " $";

   return clone;

}


// function qui cree le tableau panier

function updateProducts() {
   const cartItems = JSON.parse(localStorage.getItem("cartItems"));
         container = document.querySelector("#products");

   container.innerHTML = '';
   Object.entries(cartItems)
      .forEach(([key, v]) => {
         const elTeddy = addTeddy(key, v);
         container.append(elTeddy);
      });
}

// fonction qui supprime les élément du panier sélectionner

function deleteItemFromCart(id) {
   const cartItems = JSON.parse(localStorage.getItem("cartItems"));

   cartItems[id].qt > 1 ?
      cartItems[id].qt -= 1 :
      delete cartItems[id];

   localStorage.setItem("cartItems", JSON.stringify(cartItems))
   updateProducts();
   updateCartNb();
   updateCartPrice();
}


// envoi du formulaire
// J’écoute le submit et j initialise mon formdata qui me permet de construire facilement..
// un ensemble de paires clé/valeur représentant les champs du formulaire et leurs valeurs
const form = document.getElementById("form");

form.addEventListener('submit', (e) => {
   e.preventDefault();
  
   new FormData( form );
});

//je sélectionne mon formulaire  
//Je crée une variable formData qui correspond à l'évent formdata 
//Je créé aussi mes variables contact qui sera un objet et product qui sera un tableau
//je fais une boucle qui récupère dans un tableau les clés et valeur de mon formulaire  de ma variable formData
//Dans mon objet  contact la key du formulaire est égale a sa valeur donc au contenu

form.addEventListener('formdata', (e) => {
   const cartItems = JSON.parse(localStorage.getItem("cartItems")),
      formData = e.formData,
      contact = {}
   let products = [];

   for ( let [ k, v ] of formData ) {
      contact[ k ] = v;
   }

//Je fais une boucle dans mon objet cartItems  pour récupère les id qui si trouve..
// et les mettre dans le tableau products

   Object.entries( cartItems )
      .forEach( ( [ key ] ) => products.push( key ) );

//J’initialise la méthode POST pour envoyer les informations ( { contact, products } ) à l api

   if ( products.length ) {
      const myInit = {
         method: 'POST',
         headers: {'content-Type': 'application/json'},
         mode: 'cors',
         body: JSON.stringify( { contact, products } )
      };

      fetch( `${config.apiBase}/api/teddies/order`, myInit )
         .then( res => {
            res.json().then( d => {
               const id = d.orderId,
                  price = getCartPrice();

               window.location.assign(
                  `${config.frontBase}/confirmation.html?id=${id}&price=${price}`
               );
            } );
      } );
   }
 });


updateProducts();
// function qui calcule le cout total du panier
updateCartPrice();