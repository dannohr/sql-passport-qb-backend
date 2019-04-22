var tools = require("../../services/qbServices/qbAuthService");
var axios = require("axios");

// This is all from Intuit Developer Website

module.exports = {
  auth(req, res) {
    /** /connect_to_quickbooks **/
    console.log("Connecting to Quickbooks");
    // Set the Accounting + Payment scopes
    tools.setScopes("connect_to_quickbooks");

    // Constructs the authorization URI.
    var uri = tools.intuitAuth.code.getUri({
      // Add CSRF protection
      state: tools.generateAntiForgery(req.session)
    });

    // Redirect
    console.log("Redirecting to authorization uri: " + uri);
    res.status(200).send(uri);
  },

  callback(req, res) {
    // Verify anti-forgery
    if (!tools.verifyAntiForgery(req.session, req.query.state)) {
      return res.send("Error - invalid anti-forgery CSRF response!");
    }

    // Exchange auth code for access token
    tools.intuitAuth.code.getToken(req.originalUrl).then(
      function(token) {
        // Store token - this would be where tokens would need to be
        // persisted (in a SQL DB, for example).
        tools.saveToken(req.session, token);
        req.session.realmId = req.query.realmId;

        var errorFn = function(e) {
          console.log("Invalid JWT token!");
          console.log(e);
          res.redirect("/");
        };

        if (token.data.id_token) {
          try {
            // We should decode and validate the ID token
            jwt.validate(
              token.data.id_token,
              function() {
                res.send(token);
              },
              errorFn
            );
          } catch (e) {
            errorFn(e);
          }
        } else {
          res.send({ qbConnected: true });
        }
      },
      function(err) {
        // console.log(err);
        res.send(err);
      }
    );
  },

  refresh(req, res) {
    var token = tools.getToken(req.session);
    if (!token) return res.json({ error: "Not authorized" });

    tools.refreshTokens(req.session).then(
      function(newToken) {
        // We have new tokens!
        res.json({
          accessToken: newToken.accessToken,
          refreshToken: newToken.refreshToken
        });
      },
      function(err) {
        // Did we try to call refresh on an old token?
        console.log(err);
        res.json(err);
      }
    );
  },

  revoke(req, res) {
    let token = tools.getToken(req.session);
    if (!token) return res.json({ error: "Not authorized" });

    let url = tools.revoke_uri;
    let postConfig = {
      headers: {
        Authorization: "Basic " + tools.basicAuth,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    let body = {
      token: token.accessToken
    };

    console.log("Sending revoke to ", url);
    console.log(tools.basicAuth), console.log(token.accessToken);

    axios
      .post(url, body, postConfig)
      .then(response => {
        console.log(response.data);
        tools.clearToken(req.session);
        res.send({ response: "Revoke successful" });
      })
      .catch(err => {
        console.log(err);
        // return res.send({ error: err, statusCode: err.statusCode });
      });
  }
};
