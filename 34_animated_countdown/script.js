const numbers = document.querySelectorAll('.numbers span');
const counter = document.querySelector('.counter');
const finalMessage = document.querySelector('.final');
const replay = document.querySelector('#replay');

function runAnimation() {
	numbers.forEach((number, i) => {
		const nextToLast = numbers.length - 1;

		number.addEventListener('animationend', (event) => {
			if (event.animationName === 'goIn' && i !== nextToLast) {
				number.classList.remove('in');
				number.classList.add('out');
			} else if (event.animationName === 'goOut' && number.nextElementSibling) {
				number.nextElementSibling.classList.add('in');
			} else {
				counter.classList.add('hide');
				finalMessage.classList.add('show');
			}
		});
	});
}

function resetDOM() {
	counter.classList.remove('hide');
	finalMessage.classList.remove('show');

	numbers.forEach((number) => {
		number.classList.value = '';
	});

	numbers[0].classList.add('in');
}

runAnimation();

replay.addEventListener('click', () => {
	resetDOM();
	runAnimation();
});
