import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const generatejwt = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
};

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid id" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401);
  }
};

export { generatejwt, authenticateJWT };
