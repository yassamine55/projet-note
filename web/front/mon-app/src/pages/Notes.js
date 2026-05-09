import { useEffect, useState, useContext, useCallback } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

const PRIORITY_ORDER = { haute: 3, moyenne: 2, basse: 1 };
const FILTERS = [
  { value: "tous", label: "📋 Tous", icon: "" },
  { value: "haute", label: "🔴 Haute", icon: "" },
  { value: "moyenne", label: "🟡 Moyenne", icon: "" },
  { value: "basse", label: "🟢 Basse", icon: "" },
];

function Notes() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState("tous");
  const [search, setSearch] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchNotes = useCallback(async () => {
    if (!token) return;
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchNotes();
  }, [token, fetchNotes]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 5000);
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredNotes = notes
    .filter((note) => filter === "tous" || note.priority === filter)
    .filter((note) => note.title.toLowerCase().includes(search.toLowerCase()));

  const sortedNotes = [...filteredNotes].sort(
    (a, b) => PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority]
  );

  return (
    <div className="notes-page">
      <div className="notes-header">
        <h1>📝 Mes Notes</h1>
        <button className="btn-logout" onClick={handleLogout}>
          🚪 Déconnexion
        </button>
      </div>

      {notification.message && (
        <div className={notification.type === "success" ? "success-message" : "error-message"}>
          {notification.message}
        </div>
      )}

      <div className="form-section">
        <NoteForm 
          fetchNotes={fetchNotes} 
          editingNote={editingNote}
          onEditComplete={() => setEditingNote(null)}
          showNotification={showNotification}
        />
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Rechercher une note..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-buttons">
        {FILTERS.map(({ value, label }) => (
          <button 
            key={value}
            onClick={() => setFilter(value)}
            className={filter === value ? "active" : ""}
          >
            {value === "tous" ? `${label} (${notes.length})` : label}
          </button>
        ))}
      </div>

      <NoteList 
        notes={sortedNotes} 
        fetchNotes={fetchNotes}
        onEdit={handleEdit}
        showNotification={showNotification}
      />
    </div>
  );
}

export default Notes;