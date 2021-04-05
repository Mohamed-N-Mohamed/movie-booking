//DOM Element
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

//update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  total.innerText = selectedSeatCount * ticketPrice;

  const seatIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  //store to local storage
  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));
}

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMovieprice", moviePrice);
}

//display movies from local storage
function createUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected')
      }
   

    })

  }


  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if(selectedMovieIndex !== null){
    movieSelect.selectedIndex = selectedMovieIndex 
  }
}

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

//movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});


//init 
createUI()
updateSelectedCount()