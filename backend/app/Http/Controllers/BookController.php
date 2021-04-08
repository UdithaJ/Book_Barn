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
        $book -> genre = $req -> input('genre');
        $book -> save();
        return $req -> input();

    }

    function allBooks(){

        return book::paginate(4);
    }

    function getoneBook(Request $req){
        $bookID = $req -> id;
        return book::where('book_id',$bookID) -> get();
    }


    function borrowedBooks(){

        return book::where('status','borrowed') -> get();
    }

    function borrow ( Request $req){
       $bookID =  $req -> input('id');
       $user =  $req -> input('uid');
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
        -> orWhere('genere','Like',$genere) -> get();// should be and
    }



    function return( Request $req){
        $bookID =  $req -> id;
        $book = book::where('book_id', $bookID)->update(array('status' => 'available','borrowed_by' => null,'borrowed_date' => null));
       if($book){
        return "success";
       }
     }

     function delete( Request $req){
        $bookID =  $req -> id;
        $book = book::where('book_id', $bookID)-> delete();
       if($book){
        return "success";
       }
     }

     function update( Request $req){
        $bookID =  $req -> id;
        $book_title = $req -> input('book_title');
        $bookDescriotion =  $req -> input('book_description');
        $author =  $req -> input('author');
        $price =  $req -> input('price');
        $status =  $req -> input('status');
        $cover_image =  $req -> file('cover_image');
        $genre = $req -> input('genre');

        if($cover_image){
            $cover_image =  $req -> file('cover_image') -> store('images');
            $book = book::where('book_id', $bookID)->update(array('book_title' => $book_title,'book_description' => $bookDescriotion,'author' => $author,'price' => $price
            ,'status' => $status,'cover_image' => $cover_image,'genre' => $genre));
        }

        else{
            $book = book::where('book_id', $bookID)->update(array('book_title' => $book_title,'book_description' => $bookDescriotion,'author' => $author,'price' => $price
            ,'status' => $status,'genre' => $genre));

        }
       
       if($book){
        return "success";
       }
    
     }

}
