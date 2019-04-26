const express = require("express");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
const passport = require("passport");
const sessionManagement = require("./modules/sessionManagement");
const cors = require("cors");
require("./modules/passportConfig");

const app = express();
const port = process.env.PORT || 3001;
const routes = require("./routes");
const routesQb = require("./routes/quickBooks");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(sessionManagement);
app.use(cors());

app.use("/api", routes);
// app.get("/api/test", (req, res) => res.send("App is working"));
app.use("/api/qb", routesQb);

app.listen(port, () => {
  console.log("Express server listening on port " + port);
});
