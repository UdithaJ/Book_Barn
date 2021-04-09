<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\book;
use App\Models\User;
class BookController extends Controller
{
    function addBook(Request $req){

        $book = new book();
        $book -> book_title = $req -> input('book_title');
        $book -> book_description = $req -> input('book_description');
        $book -> author = $req -> input('author');
        $book -> price = $req -> input('price');
        $book -> cover_image = $req -> file('cover_image') -> store('images');
        $book -> genre = $req -> input('genre');
        $book -> save();
        if($book){
        return response()->json(["status" => "success"]);
        }
        else{
            return response()->json(["status" => "failed"]);
        }

    }

    function allBooks(){

        return book::paginate(5);
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

       $check = User::where('id',$user) -> first();

       if(!$check){
        return response()->json(["status" => "unknown"]);
       }

       else{
       $borrowedBooks = book::where('borrowed_by', $user) -> get();
       $bookCount = $borrowedBooks -> count();
       if($bookCount < 2){
       $date  = date("Y/m/d");
       $book = book::where('book_id', $bookID)->update(array('status' => 'borrowed','borrowed_by' => $user,'borrowed_date' => $date));
       if($book){
        return response()->json(["status" => "success"]);
        }
        else{
            return response()->json(["status" => "failed"]);
        }
    }

    else{

        return response()->json(["status" => "exceeded"]);
    }
    }
}


    function search(Request $req){

        $keyword  = $req -> key;
    
        return book::where('book_title','Like',"%$keyword%") -> 
        orWhere('book_description','Like',"%$keyword%") -> simplePaginate(4);
    }

    function sort(Request $req){

        $type  = $req -> type;
    
        return book::where('genre','=',$type) -> simplePaginate(4);// should be and
    }


    function myBooks(Request $req){

        $uid  = $req -> id;
    
        return book::where('borrowed_by','=',$uid) -> get();
    }


    function return( Request $req){
        $bookID =  $req -> id;
        $book = book::where('book_id', $bookID)->update(array('status' => 'available','borrowed_by' => null,'borrowed_date' => null));
        if($book){
            return response()->json(["status" => "success"]);
            }
            else{
                return response()->json(["status" => "failed"]);
            }
     }

     function delete( Request $req){
        $bookID =  $req -> id;
        $book = book::where('book_id', $bookID)-> delete();
        if($book){
            return response()->json(["status" => "success"]);
            }
            else{
                return response()->json(["status" => "failed"]);
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
            return response()->json(["status" => "success"]);
            }
            else{
                return response()->json(["status" => "failed"]);
            }
    
     }

}
