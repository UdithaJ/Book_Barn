# Book_Barn


Book Barn is an online web application developed for the book lending section of a library.
In this system there are two type of users. Admins and Book borrowers.
Book borrowers can register to the system through sign up option.
Admin can log in to system through admin login in the login page providing username and password
Also borrowers can login through use login with registerd email and password.
In home page it display all the books in library.
All books are paginated.
User can sort them by genre or search book by title,author or descripton by typing in the searchbar.
borrowers can select a book and see the datails of book.(Book title,Genre,Author,Description,Price).
If the book is available to borrow, borrowers can borrow it.
user can check borrowed books in 'My Books' Page.
If borrowers try to borrow a book without login, user will be notified and redirected to login page.
If the book is borrowed by othe user, borrow option will not be available.
If user need to borrow a book again, he or she has to return borrowed book/books to library.
Then admin will update the book as returned and available and then book will be available in library.
Admin can Add new book to library, Update a book and Remove from the library.

Assumptions:

* Each book item has one copy for leanding.
* user can not borrow more than two books at once.
