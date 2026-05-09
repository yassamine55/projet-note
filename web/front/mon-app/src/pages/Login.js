import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
 
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
 
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
 
  const validateForm = () => {
    const newErrors = {};
 
    if (!email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email invalide.";
    }
 
    if (!password) {
      newErrors.password = "Le mot de passe est requis.";
    }
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleLogin = async (e) => {
    e.preventDefault();
    setGeneralError("");
 
    if (!validateForm()) return;
 
    setLoading(true);
 
    try {
      const res = await API.post("/login", {
        email: email.trim(),
        password,
      });
 
      login(res.data.token);
      navigate("/notes");
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data);
 
      setGeneralError(
        error.response?.data?.message ||
        "Erreur de connexion. Vérifiez vos identifiants."
      );
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Connexion</h2>
 
        {generalError && (
          <div className="form-general-error">{generalError}</div>
        )}
 
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="votre.email@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>
 
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="form-error">{errors.password}</span>
          )}
        </div>
 
        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
 
        <div className="auth-footer">
          Pas encore inscrit ?{" "}
          <button
            type="button"
            className="link-button"
            onClick={() => navigate("/register")}
          >
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
}
 
export default Login;
