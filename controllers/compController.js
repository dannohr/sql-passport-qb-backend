const db = require("../models/index");

module.exports = {
  list(req, res) {
    return db.Company.findAll()
      .then(companies => res.status(200).send(companies))
      .catch(error => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return db.Company.findByPk(req.params.id)
      .then(company => {
        if (!company) {
          return res.status(404).send({
            message: "Company Not Found"
          });
        }
        return res.status(200).send(company);
      })
      .catch(error => res.status(400).send(error));
  },

  add(req, res) {
    return Company.create({
      name: req.body.name
    })
      .then(company => res.status(201).send(company))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return db.Company.findByPk(req.params.id)
      .then(company => {
        if (!company) {
          return res.status(404).send({
            message: "Company Not Found"
          });
        }
        return company
          .update({
            CustomerName: req.body.CustomerName
          })
          .then(() => res.status(200).send(company))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    console.log(req.params);

    return db.Company.findByPk(req.params.id)
      .then(company => {
        console.log(company);
        if (!company) {
          return res.status(400).send({
            message: "Company Not Found"
          });
        }
        return company
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
