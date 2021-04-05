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
}
