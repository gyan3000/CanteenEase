const jwt = require("jsonwebtoken");
const JWT_SECRET_ADMIN = "SaurabhAdmin";


const fetchadmin = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET_ADMIN);
        req.admin = data.admin;
        next();
    } catch (error) {
        res.status(401).send({ error: "using a valid token" });
    }
}
module.exports = fetchadmin;