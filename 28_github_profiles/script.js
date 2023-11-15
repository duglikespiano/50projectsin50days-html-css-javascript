const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

const APIURL = 'https://api.github.com/users/';

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const user = search.value;

	if (user) {
		getUser(user);
		search.value = '';
	}
});

async function getUser(username) {
	try {
		const { data } = await axios(APIURL + username);
		createUserCard(data);
		getRepositories(username);
	} catch (error) {
		if (error.response.status === 404) {
			createErrorCard('No profile with this username');
		}
	}
}

async function getRepositories(username) {
	try {
		const { data } = await axios(APIURL + username + '/repos?sort=created');
		addReposotoriesToCard(data);
	} catch (error) {
		createErrorCard('Problem fetching repositories');
	}
}

function createUserCard(user) {
	const cardHTML = `
  <div class="card">
  <div>
    <img src="${user.avatar_url}" alt="${user.name}" class="avatar" />
  </div>
  <div class="user-info">
    <h2>${user.login}</h2>
    <p>${user.bio ? user.bio : ''}</p>
    <ul>
      <li>${user.followers} <strong>Follwers</strong></li>
      <li>${user.following} <strong>Follwing</strong></li>
      <li>${user.public_repos} <strong>Repositories</strong></li>
    </ul>
    <div id="repositories"></div>
  </div>
</div>
`;
	main.innerHTML = cardHTML;
}

function createErrorCard(message) {
	const cardHTML = `
  <div class="card">
    <h1>${message}</h1>
  </div>
  `;
	main.innerHTML = cardHTML;
}

function addReposotoriesToCard(repositories) {
	const repositoresElements = document.getElementById('repositories');
	repositories.slice(0, 10).forEach((repository) => {
		const repositoryElement = document.createElement('a');
		repositoryElement.classList.add('repository');
		repositoryElement.href = repository.html_url;
		repositoryElement.target = '_blank';
		repositoryElement.innerText = repository.name;
		repositoresElements.appendChild(repositoryElement);
	});
}

getUser('duglikespiano');
