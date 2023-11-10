const API_URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=true&sort_by=popularity.desc&api_key=&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=51d7e22e16bc0264f768a1142877ad8e&query="';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const getMovies = async (URL) => {
	const result = await fetch(URL);
	const data = await result.json();
	showMovies(data.results);
};

const showMovies = (movies) => {
	main.innerHTML = '';
	movies.forEach((movie) => {
		const { title, poster_path, vote_average, overview } = movie;
		const movieElement = document.createElement('div');
		movieElement.classList.add('movie');
		movieElement.innerHTML = `
				<img
					src="${IMG_PATH + poster_path}"
					alt="${title}"
				/>
				<div class="movie-info">
					<h3>${title}</h3>
					<span class="${getClassByRate(vote_average)}">${vote_average}</span>
				</div>
				<div class="overview">
					<h3>Overview</h3>
					${overview}
				</div>
    `;
		main.appendChild(movieElement);
	});
};

const getClassByRate = (vote) => {
	if (vote >= 8) {
		return 'green';
	} else if (vote >= 5) {
		return 'orange';
	} else {
		return 'red';
	}
};

getMovies(API_URL);

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const searchTerm = search.value;

	if (searchTerm && searchTerm !== '') {
		getMovies(SEARCH_URL + searchTerm);
		search.value = '';
	} else {
		window.location.reload();
	}
});
