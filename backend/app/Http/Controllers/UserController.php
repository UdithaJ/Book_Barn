<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
    function register(Request $req){

        $user = new User;
        $user -> username = $req -> input("username");
        $user -> email = $req -> input("email");
        $user -> password = Hash::make($req -> input("password"));
        $user -> save();
        return $req -> input();
    }

}
