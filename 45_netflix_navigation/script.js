const openButton = document.querySelector('.open-button');
const closeButton = document.querySelector('.close-button');
const nav = document.querySelectorAll('.nav');

openButton.addEventListener('click', () => {
	nav.forEach((navElement) => navElement.classList.add('visible'));
});

closeButton.addEventListener('click', () => {
	nav.forEach((navElement) => navElement.classList.remove('visible'));
});
