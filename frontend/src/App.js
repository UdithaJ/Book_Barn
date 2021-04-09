
import './App.css';
import AddBook from "./components/AddBook";
import MyBooks from "./components/MyBooks";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Book from "./components/Book";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ManageBooks from "./components/ManageBooks";
import UpdateBook from "./components/UpdateBook";
import BookRack from "./components/BookRack";


function App() {
  return (
      <Router>
    <div className="App">
        <Route path = "/" exact component = {BookRack}/>
        <Route path = "/add" exact component = {AddBook}/>
        <Route path = "/books/:id" exact component = {Book}/>
        <Route path = "/signup" exact component = {SignUp}/>
        <Route path = "/login" exact component = {Login}/>
        <Route path = "/borrowedbooks" exact component = {ManageBooks}/>
        <Route path = "/viewbook/:id" exact component = {UpdateBook}/>
        <Route path = "/mybooks" exact component = {MyBooks}/>

    </div>
      </Router>
  );
}

export default App;
