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
Route::put('borrow/{id}/user/{uid}',[BookController::class,'borrow']);
Route::get('search/{genere}/keyword/{key}',[BookController::class,'search']);
Route::post('signup',[UserController::class,'register']);
