const container = document.querySelector('.container');
// NOTE: Below, .row and not() are required otherwise it selects all 'seat' elements including those in the showcase and the occupied seats.
// NOTE: Below, 'seats' is the nodelist of all the available seats i.e. nodelist of all unoccupied seats.
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  // NOTE: Below 'selectedSeats' gives nodelist of selected seats.
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Steps:
  // copy selected seats into arr
  // map through the arr
  // return a new array of indices

  // NOTE: get an array of strings denoting the selected seats indices from the 'seats' array - e.g. [0, 4, 21]
  // NOTE: below, [...selectedSeats] and [...seats] are used to convert the nodelist into a regular arrays.
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    // console.log(e.target);

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
