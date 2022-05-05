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
		const words = Store.getVocabs();
		
		//adding the words from local storage to UI list
		words.forEach(word => UI.addWordToList(word));
	}
	
	//method that adds word to list
	static addWordToList(wordObj) {
		const list = document.querySelector('#word-list');
		const row = document.createElement('tr');
		row.id = `${wordObj.word}`;
		row.innerHTML = `
			<td>${wordObj.word}</td>
			<td>${wordObj.meaning}</td>
			<td>${wordObj.difficulty}</td>
			<td><a class="btn btn-sm btn-danger delete">X</a></td>
		`;
		list.appendChild(row);
	}

	static getRandomWords() {
		//Get array of vocabs from local storage
		const wordlist = Store.getVocabs();

		//pick a random vocab
		const wordOfTheDay = wordlist[Math.floor(Math.random() * wordlist.length)];

		//display word and meaning to UI
		document.getElementById('daily-word').innerText = wordOfTheDay.word;
		document.getElementById('daily-meaning').innerText = wordOfTheDay.meaning;
	}
	
	//method that deletes word from list
	static deleteWordFromList(el) {
		if(el.classList.contains('delete')) {
			el.parentElement.parentElement.remove();
		}
	}
	
	//method that shows alert
	static showAlert(message, className) {
		//create alert box
		const alertBox = document.createElement('div');
		
		//give the alert box basic bootstrap design
		alertBox.className = `alert alert-${className}`;
		alertBox.appendChild(document.createTextNode(message));
		
		//Insert alert box at top of the page
		const container = document.querySelector('.container');
		const wordOfTheDay = document.querySelector('.lead');
		container.insertBefore(alertBox, wordOfTheDay);
		
		//Make the alert box vanish in 2 seconds
		setTimeout(() => document.querySelector('.alert').remove(),2000);
		
	}
	
	//method that clear fields
	static clearFields() {
		document.querySelector('#word').value = '';
		document.querySelector('#meaning').value = '';
		document.querySelector('#difficulty').value = '';
	}
}


//Store class: handles storage
class Store {
	static getVocabs() {
		let vocabString;
		if (localStorage.getItem('vocabString') === null) {
			vocabString = [];
		} else {
			vocabString = JSON.parse(localStorage.getItem('vocabString'));
		};
		return vocabString;
	}

	static addVocab(vocab) {
		const vocabArray = Store.getVocabs();
		vocabArray.push(vocab);
		localStorage.setItem('vocabString', JSON.stringify(vocabArray));
	}

	static removeVocab(word) {
		const vocabArray = Store.getVocabs();
		console.log(vocabArray);
		//filter out vocab from array that contains id of word
		const newArray = vocabArray.filter(vocab => vocab.word !== word);

		console.log(newArray);
		//add back to local storage;
		localStorage.setItem('vocabString', JSON.stringify(newArray));
		console.log(localStorage)
	}
}

//Event : display vocab
document.addEventListener('DOMContentLoaded', UI.displayWords);

//Event : Get random word of the day
document.addEventListener('DOMContentLoaded', UI.getRandomWords);

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
	
	//add it to store
	Store.addVocab(vocab);

	//clear fields after adding vocab
	UI.clearFields();
	
	//show success alert box
	UI.showAlert("Vocab successfully added", "success");
})

//Event : remove a vocab
document.querySelector('#word-list').addEventListener('click', e => {
	//Delete word from UI
	UI.deleteWordFromList(e.target);
	
	//Delete word from local storage\
	Store.removeVocab(e.target.parentElement.parentElement.id)
	
	//show delete message
	UI.showAlert(`${e.target.parentElement.parentElement.firstElementChild.innerText} was successfully removed`, "success");
});


