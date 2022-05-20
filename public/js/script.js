const getMovies = () => {
    axios.get('http://localhost:3000/movies')
        .then(response => {
            // eslint-disable-next-line no-console
            console.log(response.data);
            let movies = response.data;
            let output = '';
            movies.forEach(movie => {
                output += `
				<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${movie.posterPath}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text">ID
:${movie.id}</p>
    <a onclick="addFavourite(${movie.id})" class="btn btn-primary">Add to Favorites</a>
  </div>
</div> `
            });
            document.getElementById('moviesList').innerHTML = output;
        })
        .catch(err => console.log(err));


};


function getFavourites() {
    axios.get('http://localhost:3000/favourites')
        .then(response => {
            // eslint-disable-next-line no-console
            console.log(response.data);
            let movies = response.data;
            let output = '';
            movies.forEach(favourites => {
                output += `
				<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${favourites.posterPath}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${favourites.title}</h5>
    <p class="card-text">ID
:${favourites.id}</p>
  </div>
</div> `
            });
            document.getElementById('favouritesList').innerHTML = output;
        })
        .catch(err => console.log(err));

}

function addFavourite(id) {
    axios.get('http://localhost:3000/movies')
        .then(response => {
            const movieToFavourite = response.data.find(movie => movie.id === id);
            axios.post('http://localhost:3000/favourites', movieToFavourite)
                .then(response => {
                    console.log(response);
                    getFavourites();
                })
                .catch(err => console.log(err)
                )

        })


}

// function addFavourite(id) {
//
//     fetch('http://localhost:3000/favourites', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(id)
//     })
//         .then(response => response.json())
//         .then(id => {
//             getFavourites();
//         })
//         .catch(err => console.log(err));
//
//
// }


// module.exports = {
//     getMovies,
//     getFavourites,
//     addFavourite
// };


getMovies();
getFavourites();

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution


