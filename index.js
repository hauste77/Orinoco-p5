// Je fetch la route /teddies pour recuperer tous mes objets teddies
// Je boucle sur la donnee recuperer pour traiter chacun de mes objets
// Pour chaque objet, je cree un element teddy qui m'est retourne
// J'ajoute cet element a mon conteneur de produits
fetch(url).then((response) =>
   response.json().then((data) => {
      for(let teddy of data) {  
         const container = document.querySelector( "#container" ),
            el = newTeddyElement(teddy);
         container.append( el );
      }
   }).catch((error) => {
      console.error("Nous avons rencontré une erreur" + error);
    })
);

// Cette fonction cree un element produit a partir du template produit du HTML
// Elle le retourne une fois rempli
// A noter : le bouton redirige vers la page detail du produit
function newTeddyElement(teddy) {
   const tmp = document.querySelector( "template" ),
      clone = document.importNode( tmp.content, true );

   const elImg = clone.querySelector( ".img" ),
      elTitle = clone.querySelector( ".title" ),
      elDesc = clone.querySelector( ".description" ),
      elBtn = clone.querySelector( ".btn" );

   elImg.src = teddy.imageUrl;
   elTitle.innerText = teddy.name;
   elDesc.innerText = teddy.description;
   elBtn.href = `detail.html?id=${teddy._id}`;

   return clone;
}

updateCartNb()
