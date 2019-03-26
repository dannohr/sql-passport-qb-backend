const db = require("../models/index");

module.exports = {
  list(req, res) {
    return db.Customer.findAll()
      .then(customers => res.status(200).send(customers))
      .catch(error => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    console.log(req.params.id);
    return db.Customer.findByPk(req.params.id)
      .then(customer => {
        if (!customer) {
          return res.status(404).send({
            message: "Customer Not Found"
          });
        }
        return res.status(200).send(customer);
      })
      .catch(error => res.status(400).send(error));
  },

  add(req, res) {
    return db.Customer.create({
      qbId: req.body.qbId,
      Active: req.body.Active,
      Balance: req.body.Balance,
      CustomerName: req.body.CustomerName,
      SyncToken: req.body.SyncToken
    })
      .then(customer => res.status(201).send(customer))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return db.Customer.findByPk(req.params.id)
      .then(customer => {
        if (!customer) {
          return res.status(404).send({
            message: "Customer Not Found"
          });
        }
        return customer
          .update({
            CustomerName: req.body.CustomerName
          })
          .then(() => res.status(200).send(customer))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    console.log(req.params);

    return db.Customer.findByPk(req.params.id)
      .then(customer => {
        console.log(customer);
        if (!customer) {
          return res.status(400).send({
            message: "Customer Not Found"
          });
        }
        return customer
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
