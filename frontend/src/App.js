
import './App.css';
import AddBook from "./components/AddBook";
import AllBooks from "./components/AllBooks";
import {BrowserRouter as Router, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import Book from "./components/Book";

function App() {
  return (
      <Router>
    <div className="App">
        <NavBar/>
        <Route path = "/" exact component = {AllBooks}/>
        <Route path = "/add" exact component = {AddBook}/>
        <Route path = "/books/:id" exact component = {Book}/>

     
    </div>
      </Router>
  );
}

export default App;
