const curtShow = document.getElementById("curtIcon");
console.log(curtShow);

const curt = document.getElementById("curt")

curtShow.addEventListener("click", () => {
    
    curt.style.display = "block"
    

});


// const sliderSection = document.getElementById("slider-section")
// sliderSection.addEventListener("click", () => {
//     curt.style.display = "none"
// });



let getBookItem = (obj) => {
    return `  <div class="book" style="background-image: url(./images/books/${obj.imageLink})">
                
                <div class="book-info">
                    <h3 class="author">${obj.author}</h3>
                    <h2 class="title">${obj.title}</h2>
                </div>
                <div class="price-order">
                    <div class="price">${obj.price}$</div>
                    <div 
                     class="order" 
                     data-price="${obj.price}" 
                     data-image="${obj.imageLink}" 
                     data-title="${obj.title}" data-id="${obj.id}">
                        <a>
                            Add to Cart
                        </a>
                    </div>
                    <div class="info" data-desc="${obj.description}" id="info"><a>Show More</a></div>
                </div>
            </div>`;

};

// let getBookdescription = (obj) => {
//     return `  <div class="description">${obj.description}</div>  `

// };

// let bookList = [1,1,3]; 


let getBookList = (bookList) => {
    return bookList.map((obj) => {
        return getBookItem(obj);
    }).join('')
}


let booksListWrapper = document.getElementById('booksListWrapper');

var showDetails = (obj) => {
    console.log('test', obj);
}


function renderCards(){

  const currentCards = JSON.parse(localStorage.getItem('cards')) || [];
   
  let _sum = 0;
  for (let book of currentCards) {
    _sum = _sum + parseInt(book.price);
  }


  const priceValue = document.getElementById('priceValue');
  priceValue.innerHTML = _sum;

  renderOrders(currentCards);

}

function renderOrders(){
   
    const items = JSON.parse(localStorage.getItem('cards')) || [];
   
     orderList = items.map((book)=>{
        return `
          <div class="booksWrapperInCard">
              <div class="title titleInCurt"> ${book.title}</div>
              <img class= "book curtbook" src='./images/books/${book.image}'/>
              <div class="remove-book" data-id="${book.id}">
                  <i class="fa-solid fa-circle-minus"></i>
              </div>
              <div class="title"> 
                  ${book.price} $ 
              </div>
          </div>
        `
    }).join('--------------------------------------------');
  
    document.getElementById('cardList').innerHTML = orderList;

   
    removeBooks();
}


// renderCards();


function removeBooks(){
    
    let removeBooks= document.getElementsByClassName("remove-book");

    for (let element of removeBooks){

        element.addEventListener('click', (e) => {

          

            let id =  e.currentTarget.getAttribute('data-id');
    
            let currentCards = JSON.parse(localStorage.getItem('cards'));

            let filteredList = currentCards.filter((item)=>{
                return item.id !== id;
            })

            localStorage.clear();

            localStorage.setItem('cards',  JSON.stringify(filteredList));

            renderOrders();
            
            renderCards();
    
        })
    }
}





fetch('books.json') //path to the file with json data
    .then(response => {
        return response.json();
    })
    .then(data => {
        let currentCards = [];
        // console.log(data);
        booksListWrapper.innerHTML = getBookList(data);


        const showMore = document.getElementsByClassName("info");
        const orders = document.getElementsByClassName("order");
        // console.log(showMore);

        const popUp = document.getElementById("popup");
        const popUpDesc = document.getElementById("popUpDesc");


         for (let i = 0; i < showMore.length; i++) {
 
            showMore[i].addEventListener("click", (e) => {

                let desc =  e.currentTarget.getAttribute('data-desc');
    
                popUp.style.display = "flex"
    
                popUpDesc.innerHTML = desc;
            });
         }


         for (let i = 0; i < orders.length; i++) {
 
            orders[i].addEventListener("click", (e) => {
                // currentCards = JSON.parse(localStorage.getItem('cards'));
                let book = {};
                book['title'] =  e.currentTarget.getAttribute('data-title');
                book['image']  =  e.currentTarget.getAttribute('data-image');
                book['price'] =  e.currentTarget.getAttribute('data-price');
                book['id'] =  e.currentTarget.getAttribute('data-id');

                currentCards.push(book);
    
                localStorage.setItem('cards', JSON.stringify(currentCards));
                renderCards();
              
            });
           
         }

         renderCards();

        
 

        const xIcon = document.getElementById("X-icon");

        xIcon.addEventListener("click", () => {
            popUp.style.display = "none"
        });

    });
