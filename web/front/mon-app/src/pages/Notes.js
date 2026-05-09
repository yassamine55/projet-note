import { useEffect, useState, useContext, useCallback } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

const PRIORITY_ORDER = { 3: 3, 2: 2, 1: 1 };
const FILTERS = [
  { value: "tous", label: "📋 Tous", icon: "" },
  { value: 3, label: "🔴 Haute", icon: "" },
  { value: 2, label: "🟡 Moyenne", icon: "" },
  { value: 1, label: "🟢 Basse", icon: "" },
];

function Notes() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState("tous");
  const [search, setSearch] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [showFilters, setShowFilters] = useState(true);

  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 5000);
  };

  const fetchNotes = useCallback(async () => {
    if (!token) return;
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      const status = error.response?.status;
      let message = "Erreur lors du chargement des notes.";
      
      if (status === 401) {
        message = "Session expirée. Veuillez vous reconnecter.";
        logout();
        navigate("/login");
      } else if (status === 500) {
        message = "Erreur serveur. Réessayez plus tard.";
      }
      
      showNotification(message, "error");
    }
  }, [token, logout, navigate, showNotification]);

  useEffect(() => {
    if (token) fetchNotes();
  }, [token, fetchNotes]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredNotes = notes
    .filter((note) => filter === "tous" || note.priority == filter)
    .filter((note) => note.title.toLowerCase().includes(search.toLowerCase()));

  const sortedNotes = [...filteredNotes].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
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
        <div className={`toast toast-${notification.type}`}>
          {notification.message}
          <button className="toast-close" onClick={() => setNotification({ message: "", type: "" })}>
            ×
          </button>
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

      <div className="controls-section">
        <button className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
        </button>
      </div>

      {showFilters && (
        <>
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
        </>
      )}

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