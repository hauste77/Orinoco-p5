const url = `${config.apiBase}/api/teddies`;

fetch(url).then((response) =>
   response.json().then((data) => {
      console.log(data);
         for(let teddy of data) {
            addTeddy(teddy)
      }
   })
);

// fonction qui ajoute dynamiquement les teddy qu on récupérer via le fetch url
// et qui récupére l'id du produit pour le stocké dans l'url
function addTeddy(teddy) {
   const container = document.querySelector( "#container" ),
      tmp = document.querySelector( "template" ),
      clone = document.importNode( tmp.content, true );

   const elImg = clone.querySelector( ".img" ),
      elTitle = clone.querySelector( ".title" ),
      elDesc = clone.querySelector( ".description" ),
      elBtn = clone.querySelector( ".btn" );

   elImg.src = teddy.imageUrl;
   elTitle.innerText = teddy.name;
   elDesc.innerText = teddy.description;
   elBtn.href = `detail.html?id=${teddy._id}`;

   container.append( clone );
}

