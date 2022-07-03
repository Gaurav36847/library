


function Book(name, author, type){
    this.bookName = name;
    this.author = author;
    this.type = type;
}


function Display(){
    
}

Display.prototype.add = function(book){
    // console.log('adding to UI')
    let tableBody= document.getElementById('tableBody');
    let showUI = `       
    <tr>
    <th scope="row">📕</th>
    <td>${book.bookName}</td>
    <td>${book.author}</td>
    <td>${book.type}</td>
    </tr>`
    tableBody.innerHTML += showUI;

}

Display.prototype.clear= function(){
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

Display.prototype.validate = function(book){
    if(book.bookName.length <2 || book.author.length <2){
        return false;
    }
    else{
        return true;
    }
}


Display.prototype.show= function(type,result,displayMessage){
    let message = document.getElementById('message');
    message.innerHTML = `
            <div class="alert alert-${type} alert-dismissible" role="alert">
            <strong>${result}</strong> ${displayMessage}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`

    setTimeout(()=>{
        message.innerHTML = '';
    }, 3000);
}




let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit)

function libraryFormSubmit(e){
    e.preventDefault();
    console.log('your form has been submited')

    let bookName = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    console.log(bookName,author)

    let management = document.getElementById('Management');
    let programming = document.getElementById('Programming');
    let communication = document.getElementById('Communication');
    console.log(management, programming, communication);

    if (management.checked){
        type = management.value;
    }

   else if (programming.checked){
        type = programming.value;
    }

   else if (communication.checked){
        type = communication.value;
    }
    let book = new Book(bookName, author, type);
    console.log(book);

    let notes = localStorage.getItem('notes')
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes)
    }

    notesObj.push(book)
    localStorage.setItem('notes', JSON.stringify(notesObj));


    let display = new Display();

    if(display.validate(book)){

        display.add(book);
        display.clear();
        display.show('success','Success!!', 'Your book has been successfully added')
    }
    else{
        display.show('danger', 'Error!!','Sorry you cannot add this boook')
    }
}