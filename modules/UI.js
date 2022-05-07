//import Store
import { Store } from './Store.js'

//UI class: handles UI Tasks
export class UI {
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
