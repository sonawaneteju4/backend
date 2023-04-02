const jwt = require("jsonwebtoken");
require("dotenv").config()

const JWT_SECRET = process.env.PWD_ADMIN;


const fetchAdmin = (req, res, next) => {
  //Get user From the jwt token and id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please Authenticate Using Valid Token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please Authenticate Using Valid Token" });
  }
};

module.exports = fetchAdmin;