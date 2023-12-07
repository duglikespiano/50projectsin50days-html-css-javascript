const screens = document.querySelectorAll('.screen');
const choose_insect_buttons = document.querySelectorAll('.choose-insect-button');
const start_button = document.getElementById('start-button');
const game_container = document.getElementById('game-container');
const timeElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const messageElement = document.getElementById('message');
let seconds = 0;
let score = 0;
let selected_insect = {};

const startGame = () => {
	setInterval(increaseTime, 1000);
};

const increaseTime = () => {
	let minute = Math.floor(seconds / 60);
	let second = seconds % 60;
	minute = minute < 10 ? `0${minute}` : minute;
	second = second < 10 ? `0${second}` : second;
	timeElement.innerHTML = `Time: ${minute}:${second}`;
	seconds++;
};

const createInsect = () => {
	const insect = document.createElement('div');
	insect.classList.add('insect');
	const { x, y } = getRandomLocation();

	insect.style.top = `${x}px`;
	insect.style.left = `${y}px`;
	insect.innerHTML = `<img src="${selected_insect.src}" 
  alt="${selected_insect.alt}" 
  style="transform : rotate(${Math.random() * 360}deg)"/>`;

	insect.addEventListener('click', catchInsect);

	game_container.appendChild(insect);
};

const getRandomLocation = () => {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const x = Math.random() * (width - 200) + 100;
	const y = Math.random() * (height - 200) + 100;
	return { x, y };
};

function catchInsect() {
	increaseScore();
	this.classList.add('caught');
	setTimeout(() => this.remove(), 2000);
	addInsects();
}

const addInsects = () => {
	setTimeout(createInsect, 1000);
	setTimeout(createInsect, 1500);
};

const increaseScore = () => {
	score++;
	if (score > 1) {
		messageElement.classList.add('visible');
	}
	scoreElement.innerHTML = `Score: ${score}`;
};

start_button.addEventListener('click', () => screens[0].classList.add('up'));

choose_insect_buttons.forEach((button) =>
	button.addEventListener('click', () => {
		const img = button.querySelector('img');
		const src = img.getAttribute('src');
		const alt = img.getAttribute('alt');
		selected_insect = { src, alt };
		screens[1].classList.add('up');
		setTimeout(createInsect, 1000);
		startGame();
	})
);
