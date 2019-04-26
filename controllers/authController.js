var passport = require("passport");
var jwt = require("jsonwebtoken");
var jwtConfig = require("../config/jwtConfig");
const db = require("../models/index");

const jwt_secret = process.env.JWT_SECRET;
const jwt_expires_in = parseInt(process.env.JWT_TOKEN_EXPIRES_IN);

module.exports = {
  login(req, res) {
    console.log("starting login");
    if (!req.body.username || !req.body.password) {
      res.status(404).json({
        message: "All fields required"
      });
    }

    passport.authenticate("login", function(err, user, info) {
      // If Passport throws/catches an error
      if (err) {
        res.status(404).json(err);
        return;
      }

      // If a user is found
      if (user) {
        //Get company(s) user is associated with
        db.User.findOne({
          attributes: ["id"], // don't show any user info
          include: [
            {
              model: db.Company,
              attributes: ["id", "name"],
              through: { attributes: [] } // don't show join table UserCompany
            }
          ],
          where: {
            username: req.body.username
          }
        }).then(user => {
          const token = jwt.sign({ id: user.id }, jwt_secret, {
            expiresIn: jwt_expires_in
          });

          res.status(200).json({
            isAuthenticated: true,
            token,
            message: "user found & logged in",
            company: user.Companies
          });
        });
      } else {
        // If user is not found
        res.status(401).json(info);
      }
    })(req, res);
  },

  isAuthenticated(req, res, next) {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      } else if (info !== undefined) {
        console.log(info.message);
        res.status(401).send(info.message); // No auth token, Invalid Signature, etc
      } else if (user.username) {
        console.log("user is authenticated");
        return next();
      }
    })(req, res, next);
  },

  me(req, res, next) {
    let companyId = req.query.companyId;
    console.log(companyId);

    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      } else if (info !== undefined) {
        console.log(info.message);
        res.status(401).send(info.message);
      } else if (user.username) {
        db.User.findOne({
          attributes: ["id", "username"],
          include: [
            {
              model: db.Company,
              attributes: ["id", "name"],
              through: { attributes: [] }, // don't show join table UserCompany
              where: {
                id: companyId
              }
            }
          ],
          where: {
            username: user.username
          }
        }).then(user => {
          if (user != null) {
            console.log("user found in db from findUsers");
            console.log(user.username);
            res.status(200).send({
              isAuthenticated: true,
              username: user.username,
              userId: user.id,
              message: "user found & logged in",
              company: user.Companies[0]
            });
          }
        });
      }
    })(req, res, next);
  }
};
