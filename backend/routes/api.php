<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\UserController;



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('addBook',[BookController::class,'addBook']);
Route::get('books',[BookController::class,'allBooks']);
Route::get('books/{id}',[BookController::class,'getoneBook']);
Route::get('borrowedbooks',[BookController::class,'borrowedBooks']);
Route::post('borrow',[BookController::class,'borrow']);
Route::get('search/{genere}/keyword/{key}',[BookController::class,'search']);
Route::post('signup',[UserController::class,'register']);
Route::post('login',[UserController::class,'login']);

Route::post('books/update/{id}',[BookController::class,'update']);
Route::delete('books/delete/{id}',[BookController::class,'delete']);
Route::put('books/return/{id}',[BookController::class,'return']);