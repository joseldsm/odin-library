let myLibrary = []; 

function Book(name, year, pages, read) {
    this.name = name;
    this.year = year;
    this.pages = pages;
    this.read = read;
}

function addBook() {
    const name = document.getElementById("name");
    const year = document.getElementById("year");
    const pages = document.getElementById("pages");
    const read = document.getElementById("read");

    const newBook = new Book(name.value, year.value, pages.value, read.value);
    
    myLibrary.push(newBook);
    name.value = "";
    year.value = "";
    pages.value = "";
    read.value = "";

    displayBook();
}

function displayBook() {
    const cards = document.getElementById("cards");

    if (myLibrary.length > 1) {
        const allCards = document.querySelectorAll(".card");
        allCards.forEach(card => card.remove());
    }

    myLibrary.forEach((book, index) => {
        const newCard = document.createElement("div");
        newCard.className = `card`;
        newCard.id = `card${index}`;

        const title = document.createElement("p");
        title.textContent = `Book ${index + 1}`;
        newCard.appendChild(title);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.id = `removeBtn${index}`;

        newCard.appendChild(removeBtn);

        Object.keys(book).forEach((info, index) => {
            const par = document.createElement("p");
            par.textContent = `${info}:`;
            newCard.appendChild(par);

            if (index < Object.keys(book).length-1) {
                const val = document.createElement("p");
                val.textContent = `${book[info]}`;
                newCard.appendChild(val);
            } else {
                const val = document.createElement("button");
                val.textContent = `${book[info]}`;
                val.onclick = function() {
                    if (val.textContent === "yes") {
                        book[info] = "no";
                        val.textContent = book[info];
                    } else {
                        book[info] = "yes";
                        val.textContent = book[info];
                    }
                }
                newCard.appendChild(val);
            }
        })

        cards.appendChild(newCard);

        removeBtn.onclick = function() {
            let cardNb = removeBtn.id.replace(/\D/g, "");
            let cardToRemove = document.getElementById(`card${cardNb}`);
            cardToRemove.remove();
            myLibrary.splice(cardNb, 1);
        }
    });
}