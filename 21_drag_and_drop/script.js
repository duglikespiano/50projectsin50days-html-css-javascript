const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');

fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

for (const empty of empties) {
	empty.addEventListener('dragover', dragOver);
	empty.addEventListener('dragenter', dragEnter);
	empty.addEventListener('dragleave', dragLeave);
	empty.addEventListener('drop', dragDrop);
}

function dragStart() {
	this.className += ' hold';
	setTimeout(() => {
		this.className = 'invisible';
	}, 0);
}

function dragEnd() {
	this.className = 'fill';
}

function dragOver(event) {
	event.preventDefault();
	this.className += ' hovered';
}

function dragEnter(event) {
	event.preventDefault();
}

function dragLeave() {
	this.className = 'empty';
}

function dragDrop() {
	this.className = 'empty';
	this.append(fill);
}
