const path = require("path");
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv.toLowerCase() === "production";
const isProdBeta = nodeEnv.toLowerCase() === "production-beta";
const isQA = nodeEnv.toLowerCase() === "qa";
const isQABeta = nodeEnv.toLowerCase() === "qa-beta";
const isDEV = nodeEnv.toLowerCase() === "dev";

module.exports.isProd = isProd;
module.exports.PORT = process.env.PORT || "8030";
module.exports.MODULE_ROOT_PATH = moduleName =>
  isProd || isQA || isDEV || isProdBeta || isQABeta
    ? path.join(__dirname, "./public", moduleName)
    : path.join(__dirname, "../../build-assets/", moduleName);

module.exports.API_LOGIN = process.env.SERVER_API_LOGIN;
module.exports.CLIENT_ID = process.env.SERVER_CLIENT_ID;
module.exports.CLIENT_SECRET = process.env.SERVER_CLIENT_SECRET;
module.exports.COOKIE_NAME = "app-cookie-name";
module.exports.LOGIN_URL = process.env.REACT_APP_LOGIN_URL;

