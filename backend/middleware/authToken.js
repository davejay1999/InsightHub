const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const pool = require("../config/db");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const clientIp = req.ip; // Client IP address
  const requestUrl = req.originalUrl; // Request URL

  const currentTime = new Date().toLocaleString();

  console.log(
    `[${currentTime}] Verifying Authentication Token - ${
      token ? token.slice(0, 15) + "..." : "No Token"
    }, Client IP: ${clientIp}, Request URL: ${requestUrl}`
  );

  if (!token) {
    console.log(`Token not Provided.`);

    await pool.query(
      "INSERT INTO authVerificationLogs (token, login_time, status, user_id, ip_address, request_url) VALUES (?, NOW(), ?, ?, ?, ?)",
      [null, 0, null, clientIp, requestUrl]
    );

    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const user_id_decoded = decoded.userId;
    req.body.user_id = user_id_decoded; // Add User Id to req.body
    console.log(`Token is Authentic. User Id - ${user_id_decoded}`);

    await pool.query(
      "INSERT INTO authVerificationLogs (token, login_time, status, user_id, ip_address, request_url) VALUES (?, NOW(), ?, ?, ?, ?)",
      [token, 1, user_id_decoded, clientIp, requestUrl]
    );

    next();
  } catch (error) {
    console.log(`Token is Invalid + ${error}`);

    await pool.query(
      "INSERT INTO authVerificationLogs (token, login_time, status, user_id, ip_address, request_url) VALUES (?, NOW(), ?, ?, ?, ?)",
      [token, 0, null, clientIp, requestUrl]
    );

    res.status(403).json({ message: "Invalid token", error: error });
  }
};

module.exports = authenticateToken;
