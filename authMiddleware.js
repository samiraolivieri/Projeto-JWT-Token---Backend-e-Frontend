const jwt = require('jsonwebtoken')

const SECRET = "segredo_jwt_super_seguro"

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Token não conhecido." })
    }
    const token = authHeader.split(" ")[1]
    try {
        //validação
        const decoded = jwt.verify(token, SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({ error: "Token inválido." })
    }
}