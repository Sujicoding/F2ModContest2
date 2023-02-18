const issueForm = document.getElementById("issue-form");
issueForm.addEventListener("submit", issueBook);

let issuedBooks = [];
function issueBook(event) {
  event.preventDefault();
  const bookName = document.getElementById("book-name").value;
  const issuedTo = document.getElementById("issued-to").value;
  const issuedTime = new Date().toLocaleString();
  const id = issuedBooks.length + 1;
  const status = "not returned";
  issuedBooks.push({ id, bookName, issuedTo, issuedTime, status });
  displayIssuedBooks();
}

function displayIssuedBooks() {
    const tableBody = document.querySelector("#issued-books-table tbody");
    tableBody.innerHTML = "";
    issuedBooks.forEach(book => {
      const row = document.createElement("tr");
      const idCell = document.createElement("td");
      idCell.textContent = book.id;
      const bookNameCell = document.createElement("td");
      bookNameCell.textContent = book.bookName;
      const issuedToCell = document.createElement("td");
      issuedToCell.textContent = book.issuedTo;
      const issuedTimeCell = document.createElement("td");
      issuedTimeCell.textContent = book.issuedTime;
      const statusCell = document.createElement("td");
      statusCell.textContent = book.status;
      statusCell.classList.add('no-border');
      statusCell.classList.add(`status-${book.status.split(" ").join("-")}`);
      statusCell.setAttribute("contenteditable", "true");
      statusCell.addEventListener("blur", () => updateBookStatus(book.id));
      row.appendChild(idCell);
      row.appendChild(bookNameCell);
      row.appendChild(issuedToCell);
      row.appendChild(issuedTimeCell);
      row.appendChild(statusCell);
      tableBody.appendChild(row);
    });
}

function updateBookStatus(id) {
  const statusCell = document.querySelector(`#issued-books-table tbody tr:nth-child(${id}) td:nth-child(5)`);
  const status = statusCell.textContent;
  issuedBooks.forEach(book => {
    if (book.id === id) {
      book.status = status;
      statusCell.classList.remove("status-returned", "status-not-returned");
      statusCell.classList.add(`status-${status.split(" ").join("-")}`);
    }
  });
}