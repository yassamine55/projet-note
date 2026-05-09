import { useState, useEffect } from "react";
//j'utilise des axios pour parler avec laravel 
import API from "../api/axios";

const INITIAL_STATE = { title: "", content: "", priority: "basse" };
const PRIORITIES = [
  { value: "basse", label: "🟢 Basse" },
  { value: "moyenne", label: "🟡 Moyenne" },
  { value: "haute", label: "🔴 Haute" },
];

function NoteForm({ fetchNotes, editingNote, onEditComplete, showNotification }) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(editingNote || INITIAL_STATE);
    setError("");
  }, [editingNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    //j'empêche le comportement par défaut du formulaire
    e.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Le titre est obligatoire.");
      return;
    }

    setLoading(true);

    try {
      if (editingNote) {
        await API.put(`/notes/${editingNote.id}`, form);
        showNotification?.("Note modifiée avec succès !", "success");
      } else {
        await API.post("/notes", form);
        showNotification?.("Note ajoutée avec succès !", "success");
      }

      setForm(INITIAL_STATE);
      fetchNotes();
      if (onEditComplete) onEditComplete();
    } catch (err) {
      const message = editingNote ? "Erreur lors de la modification." : "Erreur lors de la création.";
      setError(message);
      showNotification?.(message, "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    //editing note est une prop qui contient la note à modifier, si elle existe. Si elle n'existe pas, on affiche le formulaire de création
    <div className="note-form-container">
      <h2>{editingNote ? "✏️ Modifier la note" : "➕ Créer une note"}</h2>
      {error && <div className="form-error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="note-form">
        <div className="form-group">
          <label>Titre *</label>
          <input
            className="note-input"
            type="text"
            name="title"
            placeholder="Titre..."
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="note-input"
            name="content"
            placeholder="Écris ta note ici..."
            value={form.content}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Priorité</label>
          <select
            className="note-select"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            {PRIORITIES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "En cours..." : editingNote ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>
    </div>
  );
}

export default NoteForm;