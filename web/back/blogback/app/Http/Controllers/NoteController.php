<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        return Note::where('user_id', $request->user()->id)->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'priority' => 'nullable|in:basse,moyenne,haute',
        ]);

        return Note::create([
            'title'    => $request->title,
            'content'  => $request->content ?? '',
            'priority' => $request->priority ?? 'basse',
            'user_id'  => $request->user()->id,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'priority' => 'nullable|in:basse,moyenne,haute',
        ]);

        $note = Note::where('id', $id)
                    ->where('user_id', $request->user()->id)
                    ->firstOrFail();

        $note->update([
            'title'    => $request->title,
            'content'  => $request->content ?? '',
            'priority' => $request->priority ?? 'basse',
        ]);

        return $note;
    }

    public function destroy(Request $request, $id)
    {
        $note = Note::where('id', $id)
                    ->where('user_id', $request->user()->id)
                    ->firstOrFail();

        $note->delete();

        return response()->json(['message' => 'Note supprimée.']);
    }
}