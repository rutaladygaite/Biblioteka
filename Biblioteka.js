var authorElement = document.querySelector("#author");
var titleElement = document.querySelector("#title");
var publisherElement = document.querySelector("#publisher");
var dateElement = document.querySelector("#date");
var descriptionElement = document.querySelector("#description");

//cia saugosime visas ivestas knygas
var booklist = [];
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
		author:author,
		title: title,
		publisher: publisher,
		date:date,
		description:description,
	}

booklist.push(record);
renderBooks();
clearForm();
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

function renderBooks(){
	if (!booklist) return;
	var result = "";
	for (var book of booklist) {
		result += `
		<div class = "book clearfix">
		<h2>${book.author}</h2>
		<h4>${book.title}</h4>
		<p>Isleido: ${book.publisher}</p>
		<date>${book.date}</date>
		<p>${book.description}</p>
		</div>
		<hr>

		`;
	}
	var bookListElement = document.querySelector(".book-list");
	bookListElement.innerHTML = result;
}