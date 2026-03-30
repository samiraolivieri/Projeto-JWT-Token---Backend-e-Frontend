import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/adm.css";

const API = import.meta.env.VITE_API_URL;

export default function Adm() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Acesso negado! Faça login primeiro.");
      navigate("/"); 
    }
  }, [navigate]);

  const cadastrar = async () => {
    
    if (!login || !senha) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API}/register`,
        { login, senha },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Usuário cadastrado com sucesso!");
      
      
      setLogin("");
      setSenha("");
      
    } catch (err) {
      const msgErro = err.response?.data?.error || "Erro ao cadastrar usuário";
      alert(msgErro);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="adm-container">
      <div className="adm-box">
        <h2>Área Administrativa</h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '20px' }}>
          Cadastre novos usuários para o sistema
        </p>

        <input 
          placeholder="Novo Login" 
          value={login} 
          onChange={e => setLogin(e.target.value)} 
        />
        
        <input 
          type="password" 
          placeholder="Nova Senha" 
          value={senha} 
          onChange={e => setSenha(e.target.value)} 
        />

        <button className="btn-adm" onClick={cadastrar}>
          Cadastrar Usuário
        </button>

        <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid #e2e8f0' }} />

        <button className="btn-adm btn-logout" onClick={handleLogout}>
          Sair do Sistema
        </button>
      </div>
    </div>
  );
}