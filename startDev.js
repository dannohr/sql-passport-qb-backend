// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require("babel-register")({
  presets: ["env"]
});
process.env.NODE_ENV = "development";
// Import the rest of our application.
module.exports = require("./server.js");
