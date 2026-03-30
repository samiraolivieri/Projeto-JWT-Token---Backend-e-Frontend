import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const API = import.meta.env.VITE_API_URL;

export default function Home() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const entrar = async () => {
    try {
      const res = await axios.post(`${API}/login`, { login, senha });

      
      localStorage.setItem("token", res.data.token);

      alert("Login realizado!");

      
      navigate("/adm");

    } catch (err) {
      alert("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="home-container">
      <div className="home-box">
        <h1>Colégio SENAI</h1>
        <p>Faça login para acessar a área administrativa</p>

        <input 
          placeholder="Login" 
          onChange={e => setLogin(e.target.value)} 
        />
        <br />

        <input 
          type="password" 
          placeholder="Senha" 
          onChange={e => setSenha(e.target.value)} 
        />
        <br />

        <button onClick={entrar}>Entrar</button>
      </div>
    </div>
  );
}