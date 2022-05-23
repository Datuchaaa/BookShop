const curtShow = document.getElementById("curtIcon");
console.log(curtShow);

const curt = document.getElementById("curt")

curtShow.addEventListener("click",() =>{
    curt.style.display = "block"
    
});

const sliderSection = document.getElementById("slider-section")
sliderSection.addEventListener("click", () =>{
    curt.style.display = "none"
});







        // let age = 30;

        // template literal
        // let sentence = `Im giorgi nucubidze and my age is ${age} and asdasdsd`;


        let getBookItem = (obj) => {
            return ` <div class="book" style="background-image: url(./images/books/${obj.imageLink})">
                        <div class="book-info">
                            <h3 class="author">${obj.author}</h3>
                            <h2 class="title">${obj.title}</h2>
                        </div>
                        <div class="price-order">
                            <div class="price">${obj.price}$</div>
                            <div class="order"><a href="">Add to Cart</a></div>
                            <div class="info" id="info"><a>Show More</a></div>
                        </div>
                    </div>`;
                    
        };  

        let getBookdescription = (obj) =>{
            return `  <div class="description">${obj.description}</div>  `
           
        };

        // let bookList = [1,1,3]; 
 

        let getBookList = (bookList) => {
            return bookList.map((obj)=>{
                return getBookItem(obj);
            }).join('')
        }


        let booksListWrapper = document.getElementById('booksListWrapper');


        fetch('books.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(data => {

            // console.log(data);
            booksListWrapper.innerHTML = getBookList(data);


            const showMore = document.getElementById("info");
            console.log(showMore);

            const popUp = document.getElementById("popup");

            showMore.addEventListener("click", () =>{
                popUp.style.display = "flex" 
                  });

                const xIcon = document.getElementById("X-icon");
                xIcon.addEventListener("click", () =>{
                popUp.style.display = "none"
            });


           

            });

            

        // console.log('list', getBookList(bookList));

        // console.log('sentence', sentence);