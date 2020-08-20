// L'objectif est de recupere l'id du produit pour fetch sa donnee
// Je recupere donc les arguments search de l'URL et je recupere l'id
const urlParams = new URLSearchParams(window.location.search),
   id = urlParams.get("id");

// Je fetch la route API avec l'id pour recupérer uniquement les infos du produit
// Je JSONify la reponse pour traduire le Stream en JSON
// Je rempli mes elements HTML a partir de la donnee recupere
fetch(url + `/${id}`).then( response => {
   response.json()
      .then( data => fillDetailElement(data) )
      .catch( error => console.error("Nous avons rencontré une erreur" + error) );
});

// Cette fonction est déclencher par l'evenement clique sur le bouton :
//  - l'ajout du produit dans le localStorage
//  - l'update du nombre de produit dans la span panier affiche
function handleBtnAddItemstoCart(teddy) {
   
   addItemToCart(teddy._id, teddy.price, teddy.name);
   updateCartNb();
}

// Cette fonction rempli mes elements HTML avec la donnee du produit
// A noter : le bouton declenche la fonction handleBtnAddItemstoCart
function fillDetailElement( teddy ) {
   const select = document.querySelector("select"),
      elTitle = document.querySelector(".title"),
      couleurs = teddy.colors,
      elImg = document.querySelector(".img"),
      elPrice = document.querySelector(".price-detail"),
      elDesc = document.querySelector(".description-detail"),
      elBtn = document.querySelector(".btn");

   elTitle.innerText = teddy.name;
   elDesc.innerText = teddy.description;
   elImg.src = teddy.imageUrl;
   elPrice.innerText = teddy.price + ' $';
   elBtn.onclick = handleBtnAddItemstoCart.bind( null, teddy);

   let options = couleurs.map(couleur => `<option>${couleur}</option>`)
   select.innerHTML = options;
}

updateCartNb()