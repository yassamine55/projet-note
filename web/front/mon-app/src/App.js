import { BrowserRouter, Routes, Route } from "react-router-dom";
 
import Login from "./pages/Login";
import Register from "./pages/Registre";
import Notes from "./pages/Notes";
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;