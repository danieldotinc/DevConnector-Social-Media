const config = require("config");

module.exports = () => {
  if (!config.get("jwtPrivateKey"))
    throw new Error("system needs jwtPrivateKey to start running !");
};
