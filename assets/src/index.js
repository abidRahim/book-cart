const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search');



function fetchBooksApi(searchedKey) {

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchedKey}`)
    .then(data => data.json())
    .then(data =>{
      console.log(data.totalItems);
      
      if(data.totalItems == 0) {
        throw "Result not found";
      }
      console.log(data) })
    .catch(err => console.error(err));

}

searchInput.addEventListener("change", searchDisplay);

function searchDisplay() {  
  const userSearchInput = this.value.split(" ").join("+");

  fetchBooksApi(userSearchInput);
}