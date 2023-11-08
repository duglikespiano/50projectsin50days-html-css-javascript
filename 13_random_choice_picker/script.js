const tagsElements = document.querySelector('.tags');
const textareaElement = document.querySelector('.textarea');

textareaElement.focus();
textareaElement.addEventListener('keyup', (event) => {
	createTag(event.target.value);

	if (event.key === 'Enter') {
		setTimeout(() => {
			event.target.value = '';
		}, 10);

		randomSelect();
	}
});

function createTag(input) {
	const tags = input
		.split(',')
		.filter((tag) => tag.trim() !== '')
		.map((tag) => tag.trim());

	tagsElements.innerHTML = '';
	tags.forEach((tag) => {
		const tagElement = document.createElement('span');

		tagElement.classList.add('tag');
		tagElement.innerText = tag;

		tagsElements.appendChild(tagElement);
	});
}

function randomSelect() {
	const times = 20;

	const interval = setInterval(() => {
		const randomTag = pickRandomTag();
		highlightTag(randomTag);

		setTimeout(() => {
			unHighlightTag(randomTag);
		}, 100);
	}, 100);

	setTimeout(() => {
		clearInterval(interval);
		setTimeout(() => {
			const randomTag = pickRandomTag();
			highlightTag(randomTag);
		}, 100);
	}, times * 100);
}

function pickRandomTag() {
	const tags = document.querySelectorAll('.tag');
	return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
	tag.classList.add('highlight');
}

function unHighlightTag(tag) {
	tag.classList.remove('highlight');
}
