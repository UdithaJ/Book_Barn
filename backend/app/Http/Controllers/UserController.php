<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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

    function login(Request $req){

        $user = User::where('email',$req -> email) -> first();
        if(!$user || !Hash::check($req -> password, $user -> password)){

            return response()->json(["status" => "failed"]);

        }

           return response()->json(["status" =>"valid", "success" => true, "user" => $user]);



    }

}
