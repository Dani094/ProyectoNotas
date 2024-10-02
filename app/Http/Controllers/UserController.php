<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //Get all users
    public function index() 
    {
        $users = User::all();
        return response()->json($users, 200);
    }

    //Get users for id
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404); 
        }
        else {
            return response()->json($user, 200);
        }
    }

    //Post users
    public function store(Request $request) 
    {
        // validation
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // Crear un nuevo usuario
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']), 
        ]);
        return response()->json(['message' => 'Usuario agregado con exito', 'user' => $user], 201);
    }

    //Put users for id
    public function update(Request $request, $id) 
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404); 
        }
        // validation
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8', 
        ]);
        //update 
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        if (isset($validatedData['password'])) {
            $user->password = bcrypt($validatedData['password']);
        }
    
        $user->save();
        return response()->json(['message' => 'Usuario actualizado con exito', 'user' => $user], 200);
    }

    //Delete users for id
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404); 
        }
        else {
            $user->delete();
            return response()->json(['message' => 'Usuario eliminado con exito', 'user' => $user], 200);
        }
    }
}
