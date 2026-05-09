import API from "../api/axios";

function NoteList({ notes, fetchNotes, onEdit, showNotification }) {
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette note ?")) {
      try {
        await API.delete(`/notes/${id}`);
        fetchNotes();
        showNotification?.("Note supprimée avec succès !", "success");
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        const message = "Erreur lors de la suppression de la note.";
        showNotification?.(message, "error");
      }
    }
  };

  if (notes.length === 0) {
    return <div className="notes-list"><p>Aucune note trouvée</p></div>;
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div className="note-card" key={note.id}>
          <h3 className="note-title">{note.title}</h3>
          <p className="note-text">{note.content || "Aucune description"}</p>
          <span className={`priority ${note.priority}`}>{note.priority}</span>
          <div className="note-actions">
            <button className="btn btn-warning" onClick={() => onEdit(note)}>
              ✏️ Modifier
            </button>
            <button className="btn btn-danger" onClick={() => handleDelete(note.id)}>
              🗑️ Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;