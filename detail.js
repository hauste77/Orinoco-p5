let url = 'http://localhost:3000/api/teddies/'

const elTitle = document.querySelector(".title");
const elImg = document.querySelector(".img");
const elPrice = document.querySelector(".price");
const elDesc = document.querySelector(".description");
const urlParams = new URLSearchParams(window.location.search),
   id = urlParams.get("id");



fetch(url + id).then((response) =>
   response.json().then((data) => {    
      elTitle.innerText = data.name;
      elDesc.innerText = data.description;
      elImg.src = data.imageUrl;
      elPrice.innerText = data.price + ' $';
      console.log(data);
      
   })
);

const carts = document.querySelectorAll(".btn");

for (let i = 0; i < carts.length; i++) {
   carts[i].addEventListener('click', function() {
      cartNumbers(id[i])
      
   })
};

function onLoadCartNumbers() {
   let productNumbers = localStorage.getItem('cartNumbers');

   if(productNumbers) {
      document.querySelector('.carts span ').textContent = productNumbers
   }
}

function cartNumbers() {
   let productNumbers = localStorage.getItem('cartNumbers');

   productNumbers = parseInt(productNumbers);

   if( productNumbers ) {
      localStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('.carts span ').textContent = productNumbers + 1;
   } else {
      localStorage.setItem('cartNumbers', 1 );
      document.querySelector('.carts span').textContent = 1;
   }
}

onLoadCartNumbers();