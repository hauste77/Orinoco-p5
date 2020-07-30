let url = 'http://localhost:3000/api/teddies';
const container = document.querySelector('.container');

fetch(url).then((response) =>
   response.json().then((data) => {
      console.log(data);
         for(let teddy of data) {
            addTeddy(teddy)
      }
   })
);

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



   // let div = document.createElement("div");
   // //div.class = 'card';
   // div.innerHTML = ` 
   //       <div class="card"> 
   //       <div class="imgbox">
   //              <img src="${teddy.imageUrl}" alt="">
   //          </div>
   //          <div class="content">
   //              <h2>${teddy.name}</h2>
   //              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
   //              <a href='detail.html?id=${teddy._id}' class="btn">Détail</a>
   //          </div>
   //       </div>`;
   //    container.appendChild(div);  

// utiliser template https://developer.mozilla.org/fr/docs/Web/HTML/Element/template
