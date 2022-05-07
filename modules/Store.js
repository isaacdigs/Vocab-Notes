//Store class: handles storage
export class Store {
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