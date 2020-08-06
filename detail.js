const url = `${config.apiBase}/api/teddies/`;

const urlParams = new URLSearchParams(window.location.search),
   id = urlParams.get("id");

fetch(url + id).then((response) =>
   response.json().then((data) => {
      console.log(data);
      const select = document.querySelector("select"),
         elTitle = document.querySelector(".title"),
         couleur = data.colors,
         elImg = document.querySelector(".img"),
         elPrice = document.querySelector(".price-detail"),
         elDesc = document.querySelector(".description-detail"),
         elBtn = document.querySelector(".btn");
      console.log(couleur)

      elTitle.innerText = data.name;
      elDesc.innerText = data.description;
      elImg.src = data.imageUrl;
      elPrice.innerText = data.price + ' $';
      elBtn.onclick = addItemToCart.bind(null, id, data.price, data.name);



      let option = couleur.map(couleurs => `<option>${couleurs}</option>`)

      select.innerHTML = option;


   })
);

function addItemToCart(id, price, name) {
   const cartItems = JSON.parse(localStorage.getItem("cartItems"));

   cartItems[id] = {
      name: name,
      qt: cartItems[id] !== undefined ? cartItems[id].qt + 1 : 1,
      price: price
   }; // operateur ternaire
   localStorage.setItem("cartItems", JSON.stringify(cartItems));
   updateCartNb();
   return false;

}


