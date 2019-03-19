import axios from "axios";
import config from "../../config/QBconfig.js";

module.exports = {
  postQBquery(authHeaders, realmId, body) {
    // return new Promise((resolve, reject) => {
    let url = config.api_uri + realmId + "/query/";
    console.log("making axios call in qbUtilServices");
    return axios
      .post(url, body, authHeaders)
      .then(response => {
        // Check if 401 response was returned - refresh tokens if so!
        // tools
        //   .checkForUnauthorized(req, requestObj, err, response)
        //   .then(function({ err, response }) {
        //     if (err || response.statusCode != 200) {
        //       return res.json({ error: err, statusCode: response.statusCode });
        //     }
        //   });
        return response.data;
      })
      .catch(err => {
        return { error: err };
      });
    // });
  }
};
