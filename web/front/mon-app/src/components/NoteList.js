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
        const status = error.response?.status;
        let message = "Erreur lors de la suppression de la note.";
        
        if (status === 401) {
          message = "Session expirée. Veuillez vous reconnecter.";
        } else if (status === 404) {
          message = "Note introuvable.";
        } else if (status === 403) {
          message = "Vous n'avez pas le droit de supprimer cette note.";
        }
        
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
          <p className="note-date">Créée le {new Date(note.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          {(() => {
            const priorityMap = { 1: 1, 2: 2, 3: 3, basse: 1, moyenne: 2, haute: 3 };
            const priorityNum = priorityMap[note.priority] || 3;
            const priorityLabels = { 1: 'Basse', 2: 'Moyenne', 3: 'Haute' };
            const label = priorityLabels[priorityNum] || 'Haute';
            return <span className={`priority priority-${priorityNum}`}>{label}</span>;
          })()}
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