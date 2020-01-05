const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  try{
    //get the token from header. Remove 'Bearer ' with split()[].
    const token = req.headers.authorization.split(" ")[1];
    //verify method verifies and decodes the token
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    //add userData from the JWT to the request
    req.userData = decoded;
    next();
  }catch(err){
    res.status(401).json({
      message: 'Auth failed',
    });
  }

}
/*const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = function(req, res, next) {
  //get the token from the header if present
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, config.get("myprivatekey"));
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};*/