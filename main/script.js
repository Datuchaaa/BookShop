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







// let age = 30;

// template literal
// let sentence = `Im giorgi nucubidze and my age is ${age} and asdasdsd`;


let getBookItem = (obj) => {
    return `  <div class="book" style="background-image: url(./images/books/${obj.imageLink})">
                <div class="remove-book"><i class="fa-solid fa-circle-minus"></i></div>
                <div class="book-info">
                    <h3 class="author">${obj.author}</h3>
                    <h2 class="title">${obj.title}</h2>
                </div>
                <div class="price-order">
                    <div class="price">${obj.price}$</div>
                    <div class="order" data-title="${obj.title}" ><a>Add to Cart</a></div>
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
  let currentCards = JSON.parse(localStorage.getItem('cards'));

  let orderList = currentCards.map((title)=>{
      return `<div class="title"> ${title}</div>
      `
       
  }).join('------------------');

  document.getElementById('cardList').innerHTML = orderList;

}


// renderCards();


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

                let title =  e.currentTarget.getAttribute('data-title');

                currentCards.push(title);
    
                localStorage.setItem('cards', JSON.stringify(currentCards));

                renderCards();
            });
         }


 

        const xIcon = document.getElementById("X-icon");

        xIcon.addEventListener("click", () => {
            popUp.style.display = "none"
        });

    });
