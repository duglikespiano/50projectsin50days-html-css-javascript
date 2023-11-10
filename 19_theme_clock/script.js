const hourElement = document.querySelector('.hour');
const minuteElement = document.querySelector('.minute');
const secondElement = document.querySelector('.second');
const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');
const toggleElement = document.querySelector('.toggle');
const needleSecond = document.querySelector('.needle.second');
const needleMinute = document.querySelector('.needle.minute');
const needleHour = document.querySelector('.needle.hour');

const days = ['Sunday', 'Monday', ' Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

toggleElement.addEventListener('click', (event) => {
	const html = document.querySelector('html');
	if (html.classList.contains('dark')) {
		html.classList.remove('dark');
		event.target.innerHTML = 'Dark mode';
	} else {
		html.classList.add('dark');
		event.target.innerHTML = 'Light mode';
	}
});

function setTime() {
	const time = new Date();
	const month = time.getMonth();
	const day = time.getDay();
	const date = time.getDate();
	const hours = time.getHours();
	const hoursForClock = hours % 12;
	const minutes = time.getMinutes();
	const seconds = time.getSeconds();
	const ampm = hours >= 12 ? 'PM' : 'AM';

	hourElement.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 11, 0, 360)}deg)`;
	minuteElement.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 59, 0, 360)}deg)`;
	secondElement.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 59, 0, 360)}deg)`;
	needleHour.style.transition = `${hours === 0 ? 'none' : 'all 0.5s ease-in'}`;
	needleMinute.style.transition = `${minutes === 0 ? 'none' : 'all 0.5s ease-in'}`;
	needleSecond.style.transition = `${seconds === 0 ? 'none' : 'all 0.5s ease-in'}`;
	timeElement.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
	dateElement.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;
}

// StackOverflow https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
	return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

setTime();

setInterval(setTime, 1000);
