
// Je met la donne dans mon localStorage correspondant a la cle et sa valeur passee en
// parametre
function localStorageSet(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Je recupere la donne dans mon localStorage correspondant a la cle passee en
// parametre
function localStorageGet(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Cette fonction initialise les donnees de mon panier :
//   - si elles existent deja alors elles sont conservees
//   - sinon elle sont initialise par un objet vide
function initCartItems() {
    const cartItems = localStorageGet("cartItems");
 
    localStorageSet("cartItems", cartItems || {});
 }

// Cette fonction ajoute un produit a mon panier dans le localStorage
// Je cree un objet avec la donnee de mon produit et le stocke dans l'objet de
// produits deja existant
// Je mets a jour le nombre affiche 
function addItemToCart(id, price, name) {
    const cartItems = localStorageGet("cartItems");
 
    cartItems[id] = {
       name: name,
       qt: cartItems[id] !== undefined ? cartItems[id].qt + 1 : 1,
       price: price
    };
    localStorageSet("cartItems", cartItems);
    return false;
}

// Cette fonction supprime un produit de mon panier dans le localStorage
// Si ma quantité est supérieur a 1, j'ai donc ce produit dans mon panier
// -- donc j'en supprime un
// Sinon je supprime totalement l'article de mon panier
function deleteItemFromCart(id) {
    const cartItems = localStorageGet("cartItems");
 
       cartItems[id].qt > 1 ?
       cartItems[id].qt -= 1 : 
       delete cartItems[id]; 
 
       localStorageSet("cartItems", cartItems);
}


// Cette fontion met a jour le nombre de produit dans le panier affiche
function updateCartNb() {
    const cartItems = localStorageGet("cartItems"),
        elCartNb = document.querySelector( ".carts span" ); 
    let cpt = 0;
 
    Object.entries( cartItems ).forEach( ( [key, value] ) => cpt += value.qt );
    elCartNb.textContent = cpt;
 }
 

initCartItems();
