function initCartItems() {
    const cartItems = localStorage.getItem('cartItems'),
        cartNb = localStorage.getItem('cartNumber');
 
    localStorage.setItem('cartItems', cartItems || "{}"); // ici on ne JSON.parse() pas la string puisqu'on exploite pas l'objet, on initialise juste.
    localStorage.setItem('cartNumber', cartNb || "0"); // idem
 }

function updateCartNb() {
    const elCartNb = document.querySelector('.carts span '),
        cartItems = JSON.parse( localStorage.getItem('cartItems' ) );
    let cpt = 0;

    Object.entries( cartItems ).forEach( ( [key, value] ) => cpt += value.qt );

    // exemple :
    //
    // const object1 = {
    //     a: 'somestring',
    //     b: 42
    //   };

    // Object.entries(object1) == [ [ "a", "somestring" ], [ "b", 42 ] ];

    // [ "a", "b" ].forEach( ( e ) => console.log( e ) );
    // "a"
    // "b"

    // [ [ "a", "somestring" ], [ "b", 42 ] ].forEach( ( [ key, value ] ) =>  console.log( key, value ) );
    // "a", "somestring"
    // "b", 42

    localStorage.setItem('cartNumber', cpt );
    elCartNb.textContent = cpt;
}

initCartItems();
updateCartNb();



