const smallCups = document.querySelectorAll('.cup-small');
const liters = document.querySelector('#liters');
const percentage = document.querySelector('#percentage');
const remained = document.querySelector('#remained');

smallCups.forEach((smallCup, i) => {
	smallCup.addEventListener('click', () => {
		highlightCup(i);
	});
});

const highlightCup = (i) => {
	smallCups.forEach((smallCup, i2) => {
		if (i2 <= i) {
			smallCup.classList.add('full');
		} else {
			smallCup.classList.remove('full');
		}
	});

	updateBigCup();
};

const updateBigCup = () => {
	const fullCups = document.querySelectorAll('.cup-small.full').length;
	const totalCups = smallCups.length;

	if (fullCups === 0) {
		percentage.style.visibility = 'hidden';
		percentage.style.hight = 0;
	} else {
		percentage.style.visibility = 'visible';
		percentage.style.height = `${(fullCups / totalCups) * 330}px`;
		percentage.innerText = `${(fullCups / totalCups) * 100}%`;
	}

	if (fullCups === totalCups) {
		remained.style.visibility = 'hidden';
		remained.style.height = 0;
	} else {
		remained.style.visibility = 'visible';
		liters.innerText = `${2 - (250 * fullCups) / 1000}L`;
	}
};

updateBigCup();
