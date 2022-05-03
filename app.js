//Vocab class: represents a vocabulary
class Vocab {
	constructor(word,meaning,difficulty) {
		this.word = word;
		this.meaning = meaning;
		this.difficulty = difficulty;
	}
}

//UI class: handles UI Tasks
class UI {
	//method that displays word list to page
	static displayWords() {
		//Predifined words for testing * remove after adding local storage
		const words = [
			{ word: "somber",
			meaning: "dark or dull in color or tone; gloomy.",
			difficulty: 3},
			{ word: "sedentary",
			meaning: "(of a person) tending to spend much time seated; somewhat inactive.",
			difficulty: 8}
		]
		
		//adding the words from local storage to UI list
		words.forEach(word => UI.addWordToList(word));
	}
	
	//method that adds word to list
	static addWordToList(wordObj) {
		const list = document.querySelector('#word-list');
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>${wordObj.word}</td>
			<td>${wordObj.meaning}</td>
			<td>${wordObj.difficulty}</td>
			<td><a href=# class="btn btn-sm btn-danger delete">X</a></td>
		`;
		list.appendChild(row);
	}
	
	//method that deletes word from list
	static deleteWordFromList(el) {
		if(el.classList.contains('delete')) {
			el.parentElement.parentElement.remove();
		}
	}
}


//Store class: handles storage

//Event : display vocab
document.addEventListener('DOMContentLoaded', UI.displayWords);

//Event : add a vocab
document.querySelector('#vocab-form').addEventListener('submit', e => {
	//Prevent submit action
	e.preventDefault();
	
	//Get values from user input
	const word = document.querySelector('#word').value;
	const meaning = document.querySelector('#meaning').value;
	const difficulty = document.querySelector('#difficulty').value;
	//instantiate a vocabulary
	const vocab = new Vocab(word, meaning, difficulty);
	
	//add it to the new vocab to UI list
	UI.addWordToList(vocab);
})

//Event : remove a vocab
document.querySelector('#word-list').addEventListener('click', e => {
	UI.deleteWordFromList(e.target);
});


