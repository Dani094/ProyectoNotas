<?php

namespace App\Http\Controllers;

use App\Models\Notes;
use Illuminate\Http\Request;

class NotesController extends Controller
{
    //Get all notes
    public function index() 
    {
        $notes = Notes::all();
        return response()->json($notes, 200);
    }

    //Get notes for id
    public function show($id)
    {
        $notes = Notes::where('user_id', $id)->get();
        if (!$notes) {
            return response()->json(['message' => 'Nota no encontrada'], 404); 
        }
        else {
            return response()->json($notes, 200);
        }
    }

    //Post notes
    public function store(Request $request) 
    {
        // validation
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'user_id' => 'required|integer|exists:users,id',
            'label' => 'required|string|max:255|',
        ]);

        // Crear un nuevo usuario
        $notes = Notes::create([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'user_id' => $validatedData['user_id'],
            'label' => $validatedData['label'],
        ]);
        return response()->json(['message' => 'Nota agregada con exito', 'Note' => $notes], 201);
    }

    //Put notes for id
    public function update(Request $request, $id) 
    {
        $notes = Notes::find($id);
        if (!$notes) {
            return response()->json(['message' => 'Nota no encontrada'], 404); 
        }
        // validation
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'user_id' => 'required|integer|exists:users,id', 
            'label' => 'required|string', 
        ]);
        //update 
        $notes->title = $validatedData['title'];
        $notes->description = $validatedData['description'];
        $notes->user_id = $validatedData['user_id'];
        $notes->label = $validatedData['label'];
    
        $notes->save();
        return response()->json(['message' => 'Nota actualizada con exito', 'Note' => $notes], 200);
    }

    //Delete notes for id
    public function destroy($id)
    {
        $notes = Notes::find($id);
        if (!$notes) {
            return response()->json(['message' => 'Nota no encontrada'], 404); 
        }
        else {
            $notes->delete();
            return response()->json(['message' => 'Eliminada con exito', 'note' => $notes], 200);
        }
    }
}
