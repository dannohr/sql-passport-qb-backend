import express from "express";
import path from "path";
import bodyParser from "body-parser";
import passport from "passport";
import sessionManagement from "./modules/sessionManagement";

require("./modules/passportConfig");

const config = require("./config");
const app = express();
const port = process.env.PORT || 3001;
const routes = require("./routes");
const routesQb = require("./routes/quickBooks");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(sessionManagement);

app.get("/", (req, res) => res.send("App is working"));
app.use("/api", routes);
app.use("/api/qb", routesQb);

console.log(process.env.NODE_ENV);
console.log(config);

app.listen(port, () => {
  console.log("Express server listening on port " + port);
});

module.exports = {
  app
};
