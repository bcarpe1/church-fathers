var fathers;
var books;
var prevScroll = 0;
var formatterTop = 0;

function loadData() {
    fathers = [
        {
            "id": 1,
            "name": "Ambrose"
         },
         {
             "id": 2,
             "name": "Jerome"
         },
         {
             "id": 3,
             "name": "Augustine of Hippo"
         },
         {
             "id": 4,
             "name": "Pope Gregory I"
         }
    ];
    books = [
        {
            "id": 1,
            "title": "On Faith",
            "url": "???",
            "fatherid": 1,
            "selected": false,
            "text": "",
            "loaded": false
        },
        {
            "id": 2,
            "title": "On the Offices of Ministers",
            "url": "???",
            "fatherid": 1,
            "selected": false,
            "text": "",
            "loaded": false
        },
        {
            "id": 3,
            "title": "On the Holy Ghost",
            "url": "???",
            "fatherid": 1,
            "selected": false,
            "text": "",
            "loaded": false
        },
        {
            "id": 4,
            "title": "TO INNOCENT",
            "url": "???",
            "fatherid": 2,
            "selected": false,
            "text": "",
            "loaded": false
        },
        {
            "id": 5,
            "title": "TO THEODOSIUS AND THE REST OF THE ANCHORITES",
            "url": "???",
            "fatherid": 2,
            "selected": false,
            "text": "",
            "loaded": false
        },
        {
            "id": 6,
            "title": "TO RUFINUS THE MONK",
            "url": "???",
            "fatherid": 2,
            "selected": false,
            "text": "",
            "loaded": false
        },
        {
            "id": 7,
            "title": "On the Beautiful and the Fitting",
            "url": "???",
            "fatherid": 3,
            "selected": false,
            "text": "",
            "loaded": false
        },
        {
            "id": 8,
            "title": "On Free Choice of the Will",
            "url": "???",
            "fatherid": 3,
            "selected": false,
            "text": "",
            "loaded": false
        },
        {
            "id": 9,
            "title": "On Christian Doctrine",
            "url": "???",
            "fatherid": 3,
            "selected": false,
            "text": "",
            "loaded": false
        },
        {
            "id": 10,
            "title": "Commentary on Job",
            "url": "???",
            "fatherid": 4,
            "selected": false,
            "text": "",
            "loaded": false
        },
        {
            "id": 11,
            "title": "Book of Pastoral Rule",
            "url": "???",
            "fatherid": 4,
            "selected": false,
            "text": "",
            "loaded": false
        },
        {
            "id": 12,
            "title": "Commentary on 1 Kings",
            "url": "???",
            "fatherid": 4,
            "selected": false,
            "text": "",
            "loaded": false
        }
    ];
}

function loadNav() {
    var fathersDiv = document.querySelector("#fathers");
    fathersDiv.innerHTML = "<ul>" + fathers.map(father => `<li onclick=selectfather(${father.id})>${father.name}</li>`).join("") + "</ul>";
}

function loadDocWithHttp(id, docName) {
    var XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {
            var resp=XHR.responseText;
            var documentText = resp.replace(/\n\n/g,"<br><br>");
            var book = books.find((book) => book.id === id);
            book.text = documentText;
            book.loaded = true;
            document.querySelector(`#booktext_${id}`).innerHTML = documentText;
        }
    }
    XHR.open("GET", "./" + docName);
    XHR.send();
}

function selectfather(id) {
    var father = fathers.find((father) => father.id === id);
    var fatherName = document.querySelector("#fatherName");
    fatherName.innerText = father.name;
    var fatherBooks = document.querySelector("#books");
    var booksList = books.filter(book => book.fatherid === id);
    fatherBooks.innerHTML=booksList.map(book => `<div id="book_${book.id}"><h2 class="bookTitle" onclick=selectBook(${book.id})>${book.title}</h2></div>`).join("");
}

function selectBook(id) {
    var book = books.find((book) => book.id === id);
    if(!book.selected) {
        book.selected = true;
        var bookElement = document.querySelector(`#book_${id}`);
        bookElement.innerHTML=`<h2 class="bookTitle" onclick=selectBook(${book.id})>${book.title}</h2><div id=booktext_${book.id}></div>`;
        if(book.loaded) {
            document.querySelector(`#booktext_${id}`).innerHTML = book.text;
        } else {
            loadDocWithHttp(id, book.url);
        }
    } else {
        book.selected = false;
        var bookElement = document.querySelector(`#book_${id}`);
        bookElement.innerHTML=`<h2 class="bookTitle" onclick=selectBook(${book.id})>${book.title}</h2>`
    }
}

function onScroll() {
    const newScroll = document.documentElement.scrollTop;
    var formatter = document.querySelector('#formatter');
    formatterTop += prevScroll - newScroll;
    var rect = formatter.getBoundingClientRect();
    formatterTop = Math.max(-rect.height, formatterTop);
    formatterTop = Math.min(0, formatterTop);
    console.log(formatterTop + ", " + formatter.style.top);
    formatter.style.top = `${formatterTop}px`;
    console.log(formatterTop + ", " + formatter.style.top);
    prevScroll = newScroll;
}

window.onscroll = onScroll;

loadData();
loadNav();