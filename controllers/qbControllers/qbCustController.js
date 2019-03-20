var tools = require("../../services/qbServices/qbAuthService");
import axios from "axios";
import config from "../../config/QBconfig.js";
import { postQBquery } from "../../services/qbServices/qbUtilServices";

//  Controller for the Quickbooks CUSTOMER

// Sample query to get customers to sync:  (use postQbQuery)
// select * from Customer Where Metadata.LastUpdatedTime > '2015-03-01'

module.exports = {
  list(req, res, next) {
    // Check for token will return res.status(401) if there is no token.
    // If there is a token, return the valud auth headers
    let authHeaders = tools.checkForToken(req, res, next);
    let body = "Select * from Customer startposition 1 maxresults 500";

    if (authHeaders.headers) {
      postQBquery(authHeaders, req.session.realmId, body)
        .then(response => {
          // console.log(
          //   "---------------------------------------------------------"
          // );
          // console.log(
          //   " ---- Response from postQBquery in qbCustController ---- "
          // );
          // console.log(response.data);
          // console.log(
          //   "---------------------------------------------------------"
          // );

          // console.log(" ---- Response from pleaseWork ---- ");
          // let pleaseWork = inspect(response);
          // console.log(pleaseWork);
          res.status(200).send(response);
          // let rev?isedWork = pleaseWork.
        })
        .catch(err => {
          // console.log(err);
          return res.send({ error: err });
        });
    }
  },

  getById(req, res, next) {
    console.log("params id ", req.params.id);
    console.log("query id ", req.query.id);
    let authHeaders = tools.checkForToken(req, res, next);
    let url = config.api_uri + realmId + "/customer/" + req.query.id;

    return axios
      .get(url, authHeaders)
      .then(response => {
        // Check if 401 response was returned - refresh tokens if so!
        // tools
        //   .checkForUnauthorized(req, requestObj, err, response)
        //   .then(function({ err, response }) {
        //     if (err || response.statusCode != 200) {
        //       return res.json({ error: err, statusCode: response.statusCode });
        //     }
        //   });
        console.log(response);
        return response.data;
      })
      .catch(err => {
        console.log(err);
        return { error: err };
      });
  }
};
