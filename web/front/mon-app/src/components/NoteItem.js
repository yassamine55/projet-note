import API from "../api/axios";
import { useState } from "react";
//fetchnotes est une fonction qui permet de rafraichir la liste des notes après une suppression ou une modification
function NoteItem({ note, fetchNotes }) {
  const [loading, setLoading] = useState(false);

  const deleteNote = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette note ?")) {
      return;
    }

    setLoading(true);
    try {
      await API.delete(`/notes/${note.id}`);
      // Plus besoin de passer les headers manuellement grâce à l'intercepteur
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setLoading(false);
    }
  };

  const priorityConfig = {
    haute: { icon: "🔴", color: "#e74c3c", label: "Haute" },
    moyenne: { icon: "🟡", color: "#f39c12", label: "Moyenne" },
    basse: { icon: "🟢", color: "#27ae60", label: "Basse" },
  };

  const config = priorityConfig[note.priority] || priorityConfig.basse;

  return (
    <div className="note-item" style={{ borderLeftColor: config.color }}>
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <span
          className="note-priority"
          style={{ backgroundColor: config.color }}
        >
          {config.icon} {config.label}
        </span>
      </div>

      <div className="note-footer">
        <button
          className="btn btn-danger btn-small"
          onClick={deleteNote}
          disabled={loading}
        >
          {loading ? "Suppression..." : "Supprimer"}
        </button>
      </div>
    </div>
  );
}

export default NoteItem;