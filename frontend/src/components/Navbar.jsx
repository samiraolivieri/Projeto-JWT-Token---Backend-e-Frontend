import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: 20, background: "#222", padding: 15 }}>
      <Link to="/" style={{ color: "#fff" }}>HOME</Link>
      <Link to="/adm" style={{ color: "#fff" }}>ADM</Link>
      <Link to="/contatos" style={{ color: "#fff" }}>CONTATOS</Link>
    </nav>
  );
}