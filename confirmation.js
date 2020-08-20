// Je recupere l'id de commande et le totale de la commande que j'ai stockée dans l'url
// et je les affiche dans des span dynamiquement

const urlParams = new URLSearchParams (window.location.search ),
   id = urlParams.get("id"),
   price = urlParams.get("price"),
   elNb = document.querySelector( "#nb" ),
   elPrice = document.querySelector( "#price" );
elNb.innerText = 'N° ' + id;
elPrice.innerText = price + ' $';