const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const jwtSecret = require("../config/jwtConfig");
const passport = require("passport");

const BCRYPT_SALT_ROUNDS = 8;

const Op = Sequelize.Op;

// const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const db = require("../models/index");

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
      session: false
    },
    (req, username, password, done) => {
      console.log(username);
      console.log(req.body.email);

      try {
        db.User.findOne({
          where: {
            [Op.or]: [
              {
                username
              },
              { email: req.body.email }
            ]
          }
        }).then(user => {
          if (user != null) {
            console.log("username or email already taken");
            return done(null, false, {
              message: "username or email already taken"
            });
          }
          bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
            db.User.create({
              username,
              password: hashedPassword,
              email: req.body.email,
              firstName: req.body.firstName,
              lastName: req.body.lastName
            }).then(user => {
              console.log("user created via Passport register");
              return done(null, user);
            });
          });
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false
    },
    (username, password, done) => {
      console.log(username);
      console.log(password);
      try {
        db.User.findOne({
          where: {
            username
          }
        }).then(user => {
          if (user === null) {
            return done(null, false, {
              message: "bad username  - passportConfig.js"
            });
          }
          bcrypt.compare(password, user.password).then(response => {
            if (response !== true) {
              console.log("passwords do not match - passportConfig.js");
              return done(null, false, {
                message: "passwords do not match  - passportConfig.js"
              });
            }
            console.log("user found & authenticated");
            return done(null, user);
          });
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: jwtSecret.jwtSecret
};

passport.use(
  "jwt",
  new JWTstrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload);
    try {
      db.User.findOne({
        where: {
          id: jwt_payload.id
        }
      }).then(user => {
        if (user) {
          console.log("user found in db in passport");
          done(null, user);
        } else {
          console.log("user not found in db");
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  })
);
