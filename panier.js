
// Cette fonction calcule et ajoute le prix total du panier dans son element HTML
// Pour calculer le prix total, elle parse  tous les elements .total contenant
// le prix des produits et additionne les nombres.
function updateCartPrice() {
   let tp = 0;
   const elTotaleP = document.querySelector("#totale-panier"),
      elsTotal = document.querySelectorAll(".total");

   elsTotal.forEach(e => tp += parseInt(e.innerText));
   elTotaleP.innerText = `${tp} $`;
}

// Cette fonction affiche l'ensemble des produits dans le panier
// Dans un premier temps, elle vide le conteneur
// Elle boucle sur les produits existant et ajouter une ligne pour chaque
// produit
function updateProductsRow() {
   const cartItems = localStorageGet("cartItems"), 
      container = document.querySelector("#products");

   container.innerHTML = '';
   Object.entries(cartItems) 
      .forEach(([key, v]) => {  
         const elTeddy = handleCartAddRow(key, v); 
         
         container.append( elTeddy );
         updateCartNb();
      });
}

// fonction que je vais appeler pour récupérer mon totale pour la page confirmation
function getCartPrice() {
   return parseInt(
      document.querySelector("#totale-panier").innerText
   );
}

function handleCartDeleteRow(id) {
   deleteItemFromCart(id); // je fais appel à la fonction deleteItemFromCart qui va supprimer mon produit via son id
   updateCartNb();
   updateProductsRow(); // je fais appel à la fonction updateProductsRow qui va mettre à jour mon container 
   updateCartPrice(); // je fais appel à la fonction updateCartPrice qui va mettre à jour mon totale 
}

// fonction qui ajoute dynamiquement les teddies dans mon Template...
// qui a deux paramètres un teddy qui correspond a mon teddie et un id qui je vais utiliser pour récupérer l'id du teddie sur mon bouton quand je clic dessus 
function handleCartAddRow(id, teddy) {
   const tmp = document.querySelector("#product-item");
   let clone = document.importNode(tmp.content.children[0], true);

   const elQuantity = clone.querySelector(".quantity"),
      elTotal = clone.querySelector(".total"),
      elTitle = clone.querySelector(".title-panier"),
      elPrice = clone.querySelector(".price"),
      elBtn = clone.querySelector(".remove");

   elBtn.id = id; // je recupére l'id sur mon bouton supprimer
   elBtn.onclick = handleCartDeleteRow.bind(null, id); // je lui affecte la fonction  handleCartDeleteRow que je lie au clic qui va me supprimer un produit via son ID
   elQuantity.innerText = teddy.qt;
   elTotal.innerText = teddy.price * teddy.qt + " $"; // je calcule mon totale ligne en fessant une multiplication du prix et de la quantité
   elTitle.innerText = teddy.name;
   elPrice.innerText = teddy.price + " $";

   return clone;
}


   // envoi du formulaire
   // J’écoute le submit et j initialise mon formdata qui me permet de construire facilement..
   // un ensemble de paires clé/valeur représentant les champs du formulaire et leurs valeurs
   const form = document.getElementById("form");

   form.addEventListener('submit', (e) => {
      e.preventDefault();
      new FormData(form);
   });

   //je sélectionne mon formulaire et j'écoute le formdata 
   //Je créé mes variables contact qui sera un objet et product qui sera un tableau
   //je fais une boucle qui récupère dans un tableau les clés et valeur de mon formulaire  de ma variable formData
   //Dans mon objet  contact la key du formulaire est égale a sa valeur donc au contenu
   form.addEventListener('formdata', (e) => {
      const cartItems = localStorageGet("cartItems"),
         formData = e.formData,
         contact = {}
      let products = [];

      for (let [k, v] of formData) {
         contact[k] = v;
      }

      //Je fais une boucle dans mon objet cartItems  pour récupère les id qui si trouve..
      // et les mettre dans le tableau products

      Object.entries(cartItems)
         .forEach(([key]) => products.push(key));

      //J’initialise la méthode POST pour envoyer les informations ( { contact, products } ) à l api

      if (products.length) {
         const myInit = {
            method: 'POST',
            headers: {
               'content-Type': 'application/json'
            },
            body: JSON.stringify({
               contact,
               products
            })
         };

         fetch(url + `/order`, myInit)
            .then(res => {
               res.json().then(d => {
                  const id = d.orderId,
                     price = getCartPrice();
                  window.location.assign(
                     `${config.frontBase}/confirmation.html?id=${id}&price=${price}`
                  );
               }).catch((error) => {
                  console.error("Nous avons rencontré une erreur" + error);
               })
            });
      }
   });
   updateProductsRow();
   // function qui calcule le cout total du panier
   updateCartPrice();
   updateCartNb()