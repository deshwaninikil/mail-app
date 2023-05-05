import "./App.css";
import { Inbox } from "./pages/Inbox";
import { MailDetail } from "./pages/MailDetail";
import { Spam } from "./pages/Spam";
import { Trash } from "./pages/Trash";
import { Routes, Route, NavLink } from "react-router-dom";

function App() {
  const activeNav = ({ isActive }) => ({
    color: "black",
    borderRadius: "30px",
    textDecoration: "none",
    display: "block",
    padding: "10px",
    marginTop: "10px",
    backgroundColor: isActive ? "rgba(125, 125, 125, 0.3)" : "",
  });
  return (
    <div className="App">
      <div className="headerContainer">
        <nav className="sidebar">
          <NavLink to="/" style={activeNav} className="navLink">
            <i class="fa-solid fa-envelope-open"></i> Inbox
          </NavLink>
          <NavLink to="/spam" style={activeNav} className="navLink">
            <i class="fa-solid fa-circle-exclamation"></i> Spam
          </NavLink>
          <NavLink to="/trash" style={activeNav} className="navLink">
            <i class="fa-solid fa-trash"></i> Trash
          </NavLink>
        </nav>
      </div>
      <div className="mailBox">
        <Routes>
          <Route path="/" element={<Inbox />} />
          <Route path="/spam" element={<Spam />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/maildetail/:mailId" element={<MailDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
