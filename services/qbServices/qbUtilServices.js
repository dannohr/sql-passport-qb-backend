import axios from "axios";
import config from "../../config/QBconfig.js";
import tools from "../../services/qbServices/qbAuthService";

module.exports = {
  postQBquery(authHeaders, realmId, body) {
    // return new Promise((resolve, reject) => {
    let url = config.api_uri + realmId + "/query/";
    console.log("making axios call in qbUtilServices");
    return axios
      .post(url, body, authHeaders)
      .then(response => {
        console.log(
          "---------------------------------------------------------"
        );
        console.log(" ---- Response from postQBquery in postQBquery ---- ");
        console.log(response.data);
        console.log(
          "---------------------------------------------------------"
        );

        // Check if 401 response was returned - refresh tokens if so!
        // tools
        //   .checkForExpiredToken(req, requestObj, err, response)
        //   .then(function({ err, response }) {
        //     console.log("caught 401 error in the .then");
        //     if (err || response.statusCode != 200) {
        //       return res.json({ error: err, statusCode: response.statusCode });
        //     }
        //   });
        return response.data;
      })
      .catch(err => {
        console.log(
          "---------------------------------------------------------"
        );
        console.log("---- Response from postQBquery in postQBquery ----");
        // console.log(err.response.status);
        // console.log(err.response.response);
        console.log("auth headers are: ");
        // console.log(authHeaders);
        ("---------------------------------------------------------");
        // Check if 401 response was returned - refresh tokens if so!
        let req = err.response.request;
        let requestObj = { url: url, headers: { Authorization: authHeaders } };
        let response = err.response;

        // tools
        //   .checkForExpiredToken(req, requestObj, err, response)
        //   .then(function({ err, response }) {
        //     console.log("caught 401 error in the .catch");
        //     if (err || response.statusCode != 200) {
        //       // return res.json({ error: err, statusCode: response.statusCode });
        //       return { error: err, statusCode: response.statusCode };
        //     }
        //   });

        // return { error: err };
        return { error: err.response };
      });
  }
};
