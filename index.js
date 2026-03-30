const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const db = require("./bd");
const authMiddleware = require("./authMiddleware");

const app = express();
app.use(express.json());
app.use(cors());


const SECRET = "segredo_jwt_super_seguro";


app.post("/register", async (req, res) => {
  const { login, senha } = req.body;

  try {
    
    const hash = await bcrypt.hash(senha, 10);
    const sql = "INSERT INTO credencial (login, senha) VALUES (?, ?)";

    db.query(sql, [login, hash], (err, result) => {
      if (err) {
        console.error("Erro ao registrar:", err);
        return res.status(400).json({ error: "Usuário já existe ou erro no banco" });
      }
      res.json({ message: "Usuário criado com sucesso" });
    });
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});


app.post("/login", (req, res) => {
  const { login, senha } = req.body;

  const sql = "SELECT * FROM credencial WHERE login = ?";

  db.query(sql, [login], async (err, results) => {
    if (err) {
      console.error("Erro na consulta:", err);
      return res.status(500).json({ error: "Erro interno no banco de dados" });
    }

    
    if (!results || results.length === 0) {
      console.log(`Tentativa de login falhou: Usuário ${login} não encontrado.`);
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const user = results[0];
    
    
    const valid = await bcrypt.compare(senha, user.senha);

    if (!valid) {
      console.log(`Tentativa de login falhou: Senha incorreta para o usuário ${login}.`);
      return res.status(400).json({ error: "Senha inválida" });
    }

    console.log(`Login bem-sucedido: ${login}`);

    
    const token = jwt.sign(
      { id: user.id, login: user.login },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  });
});


app.get("/admin", authMiddleware, (req, res) => {
  res.json({
    message: "Bem-vindo ADM",
    user: req.user
  });
});


app.listen(3040, () => {
  console.log("-----------------------------------------");
  console.log("Servidor rodando em http://localhost:3040");
  console.log("-----------------------------------------");
});