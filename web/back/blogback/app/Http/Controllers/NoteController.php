<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        return Note::where('user_id', $request->user()->id)
                   ->orderBy('created_at', 'desc')
                   ->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:100',
            'content' => 'nullable|string',
            'priority' => 'nullable|integer|min:1|max:3',
        ]);

        return Note::create([
            'title'    => $request->title,
            'content'  => $request->content ?? '',
            'priority' => $request->priority ?? 1,
            'user_id'  => $request->user()->id,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:100',
            'content' => 'nullable|string',
            'priority' => 'nullable|integer|min:1|max:3',
        ]);

        $note = Note::where('id', $id)
                    ->where('user_id', $request->user()->id)
                    ->firstOrFail();

        $note->update([
            'title'    => $request->title,
            'content'  => $request->content ?? '',
            'priority' => $request->priority ?? 1,
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