import tools from "../../services/qbServices/qbAuthService";
import axios from "axios";
import config from "../../config/QBconfig.js";

//  Controller for the Quickbooks COMPANY

module.exports = {
  list(req, res, next) {
    console.log("getting company");
    // Check for token will return res.status(401) if there is no token.
    // If there is a token, return the valud auth headers
    let authHeaders = tools.checkForToken(req, res, next);

    // Set up API call (with OAuth2 accessToken)
    if (authHeaders.headers) {
      let url =
        config.api_uri +
        req.session.realmId +
        "/companyinfo/" +
        req.session.realmId;

      axios
        .get(url, authHeaders)
        .then(response => {
          // Check if 401 response was returned - refresh tokens if so!
          // console.log("reg is");
          // console.log(req);
          // console.log("requestObj is");
          // console.log(requestObj);
          // console.log("err is");
          // console.log(err);
          // console.log("response");
          // console.log(response);
          // tools
          //   .checkForExpiredToken(req, requestObj, err, response)
          //   .then(function({ err, response }) {
          //     if (err || response.statusCode != 200) {
          //       return res.json({
          //         error: err,
          //         statusCode: response.statusCode
          //       });
          //     }
          //   });

          res.status(200).send(response.data);
        })
        .catch(err => {
          console.log("in .catch in qbCompController");
          console.log(err.response);
          res.status(401).send({ error: err.response });
        });
    }
  }
};
