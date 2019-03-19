import express from "express";
import path from "path";
import logger from "morgan";
import bodyParser from "body-parser";
import passport from "passport";
import sessionManagement from "./modules/sessionManagement";

const app = express();
const port = process.env.PORT || 3001;
const routes = require("./routes");
const routesQb = require("./routes/quickBooks");

require("./modules/passportConfig");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(sessionManagement);
app.use(passport.initialize());

app.get("/", (req, res) => res.send("App is working"));

app.use("/api", routes);
app.use("/api/qb", routesQb);

app.listen(port, () => {
  console.log("Express server listening on port " + port);
});

module.exports = {
  app
};
