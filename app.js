//Imports
import {Store} from './modules/Store.js';
import {UI} from './modules/UI.js'

//Vocab class: represents a vocabulary
class Vocab {
	constructor(word,meaning,difficulty) {
		this.word = word;
		this.meaning = meaning;
		this.difficulty = difficulty;
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


