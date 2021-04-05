<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\book;
class BookController extends Controller
{
    function addBook(Request $req){

        $book = new book();
        $book -> book_title = $req -> input('book_title');
        $book -> book_description = $req -> input('book_description');
        $book -> author = $req -> input('author');
        $book -> price = $req -> input('price');
        $book -> status = $req -> input('status');
        $book -> cover_image = $req -> file('cover_image') -> store('images');

        $book -> save();
        return $req -> input();

    }

    function allBooks(){

        return book::all();
    }

    function borrowedBooks(){

        return book::where('status','borrowed') -> get();
    }

    function borrow ( Request $req){
       $bookID = $req -> id;
       $user = $req -> uid;
       $date  = date("Y/m/d");
       $book = book::where('book_id', $bookID)->update(array('status' => 'borrowed','borrowed_by' => $user,'borrowed_date' => $date));
      if($book){
       return "success";
      }
    }

    function search(Request $req){

        $keyword  = $req -> key;
        $genere  = $req -> genere;

        return book::where('book_title','Like',$keyword) -> orWhere('book_description','Like',$keyword) 
        -> orWhere('genere','Like',$genere) -> get();
    }


}
