let url = 'http://localhost:3000/api/teddies';
const container = document.querySelector('.container');

fetch(url).then((response) =>
 response.json().then((data) => {
    console.log(data);
   // document.querySelector('#home').innerHTML = data.name;
   for(let teddy of data) {
      addTeddy(teddy)
   }
 })
);


function addTeddy(teddy) {
   let div = document.createElement("div");
   //div.class = 'card';
   div.innerHTML = ` 
         <div class="card"> 
         <div class="imgbox">
                <img src="${teddy.imageUrl}" alt="">
            </div>
            <div class="content">
                <h2>${teddy.name}</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <a href='detail.html?id=${teddy._id}' class="btn">Acheter</a>
            </div>
         </div>`;
      container.appendChild(div);  
}