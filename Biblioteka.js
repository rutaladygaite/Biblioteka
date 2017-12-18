var authorElement = document.querySelector("#author");
var titleElement = document.querySelector("#title");
var publisherElement = document.querySelector("#publisher");
var dateElement = document.querySelector("#date");
var descriptionElement = document.querySelector("#description");

//cia saugosime visas ivestas knygas
var bookList = [];
var booksJSON = localStorage.getItem("books");
var bookList = JSON.parse(booksJSON);

if (bookList === null){
	bookList = [];
}

var addBookButton = document.querySelector(".btn-save-book")

addBookButton.addEventListener("click", addBook);

function addBook() {
	var author = authorElement.value;
	var title = titleElement.value;
	var publisher = publisherElement.value;
	var date = dateElement.value;
	var description = descriptionElement.value;

	if(!author || !title || !publisher || !date || !description) {
		alert("Neuzpildyti laukeliai");
		return;
	}

	var record = {
		"author":author,
		"title": title,
		"publisher": publisher,
		"date":date,
		"description":description,
	}

if (checkForDublicates(record)){ //kreipiames i funkcija pries irasydami
	alert ("Tokia knyga yra jau irasyta");
	return;

}

bookList.push(record); //issaugoti
booksJSON = JSON.stringify(bookList); //perrasyti JSON formatu
localStorage.setItem("books", booksJSON); //dar karta issaugoti

renderBooks();
clearForm();

document.getElementById('screen').style.display = 'none'
}

var clearButton = document.querySelector(".btn-clear-form");

clearButton.addEventListener("click", clearForm);

function clearForm(){
	authorElement.value = "";
	titleElement.value = "";
	publisherElement.value = "";
	dateElement.value = "";
	descriptionElement.value = "";

}

var formElement = document.querySelector(".library-form");

function checkForDublicates(record){
	var isDuplicate = false;

	bookList.forEach(function(item){ //kiekvienam taikysim funkcija, kurios vardas item
		if(item.author == record.author && item.title == record.title && item.date == record.date){
			isDuplicate = true;

		}
	});
	return isDuplicate;
}


function renderBooks(){
	if (!bookList) return;
	var result = "";
	for (var book of bookList) {
		result += `
		<div class = "book clearfix">
		<span onclick = "openModal(this.id)" style = "cursor:pointer;" id= "${book.title}">
		<h2>${book.author}</h2>
		<h4>${book.title}</h4>
		<p>Isleido: ${book.publisher}</p>
		<date>${book.date}</date>
		<p>${book.description}</p>
		</span>
		</div>
		<hr>

		`;
	}
	var bookListElement = document.querySelector(".book-list");
	bookListElement.innerHTML = result;
}

function openModal(clicked_id){ //turime sugeneruoti koda, kad kievkienam ivedimui butu priskiriamas id
	var book = findElement(clicked_id);
	document.getElementById('screen-item').style.display = 'block';
	var result = `
	<div class  = "modal-screen" onclick="event.stopPropagation();">
		<header class = "popup-container">
		<h1> ${book.author} ${book.title} </h1>
		</header>
		<hr>
		<div class = "popup-container">
			<h4> Leidykla: "${book.publisher}" </h4>
			<h4> Data: "${book.date}" </h4>
			<p> ${book.description} </p>
	</div>
	<footer class = "popup-container">
	<button type = "button" class = "btn-primary" onclick = "document.getElementById('screen-item').style.display = 'none'"> Uzdaryti </button>
	
</footer>
	`
	document.getElementById("screen-item").innerHTML =result;
}

function findElement (bookName) {
	var count = 0;
	for (book of bookList){
		if(book.title == bookName){
			return book;
		}
		count++;
	}
}

renderBooks();

