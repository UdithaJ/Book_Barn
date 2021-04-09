<?php

namespace App\Http\Controllers;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    
    function login(Request $req){

        $user = Admin::where('username',$req -> username) -> first();
        if($user && $req -> password == $user -> password){

            return response()->json(["status" =>"valid", "success" => true, "user" => $user]);

    
        }

        return response()->json(["status" => "failed"]);

         



    }


}
