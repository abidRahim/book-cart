const searchInput = document.querySelector('.search-field');
const searchButton = document.querySelector('.search');
const cardsContainer = document.querySelector('.cards-container');
const searchIcon = document.querySelector('.search-icon');
const hero = document.querySelector('.hero');
const showReadListBtn = document.querySelector('.read-list');
var storedResult;

var readList = JSON.parse(localStorage.getItem("readListItem")) || [];

function fetchBooksApi(searchedKey) {

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchedKey}&maxResults=40`)
    .then(data => data.json())
    .then(data =>{
      
      if(data.totalItems == 0) {
        throw "Result not found";
      }
      storedResult = data;
      console.log(storedResult)
      cardGenerator(storedResult, cardsContainer); })
    .catch(err => console.error(err));
    
}

function searchDisplay(e) {  
  if(e.keyCode != 13) return;
  const userSearchInput = this.value.split(" ").join("+");
  hero.style.display = "none";

  fetchBooksApi(userSearchInput);
}

function cardGenerator(storedResult, elm) {  
  document.body.style.background = "#eee";

  elm.innerHTML = storedResult.items.map( (item, index) => {
    // console.log(item.volumeInfo.authors[0]);

  return `
    <div class="card-block"> 
      <div class="card--thumbnail">
        <img class="card--img" src="${item.volumeInfo.imageLinks.smallThumbnail}" alt="${item.volumeInfo.title}">
      </div>
      <div class="card--details">
        <p class="card--title">${item.volumeInfo.title}</p>
        <div class="sub-details__card">
          <p class="card--rating">Ratings: ${(item.volumeInfo.averageRating)? item.volumeInfo.averageRating : "No ratings yet"} ${(item.volumeInfo.averageRating)? " / 5" : ""}</p>
          <i class="wishlist fas fa-bookmark" data-id=${item.id}></i>
        </div>
      </div>
    </div>
      ` });
    // <p class="card--authors">${item.volumeInfo.authors[0]}</p>
}

function addToReadList(e) {
  if(!e.target.classList.contains('wishlist')) return;
  var addBtn = document.querySelector(".wishlist");
  var id = e.target.dataset.id;
   
  // watchList.push(allMoviesList[id]);
  localStorage.setItem("readListItem", JSON.stringify(readList));

 	
 	if(readList.includes(id)) return;
 	readList.push(id);
	localStorage.setItem("readListItem", JSON.stringify(readList));
}

function showReadList(e) {
  e.preventDefault();
  console.log(e);
  
  hero.style.display = "none";
  cardsContainer.style.display = "none";

  filteredBooks = storedResult.items.filter( item => {
    return readList.filter( id => id == item.id )
  });

  console.log(filteredBooks);  
}

searchInput.addEventListener("keyup", searchDisplay);
searchIcon.addEventListener("click", searchDisplay);
searchInput.addEventListener("click", () => document.body.style.background = "#eee");
searchInput.addEventListener("blur", () => document.body.style.background = "white");
cardsContainer.addEventListener("click", addToReadList);
showReadListBtn.addEventListener("click", showReadList);