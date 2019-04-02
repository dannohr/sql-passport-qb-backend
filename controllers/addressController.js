const db = require("../models/index");

module.exports = {
  list(req, res) {
    return db.Address.findAll()
      .then(addresses => res.status(200).send(addresses))
      .catch(error => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return db.Address.findByPk(req.params.id)
      .then(address => {
        if (!address) {
          return res.status(404).send({
            message: "Address Not Found"
          });
        }
        return res.status(200).send(address);
      })
      .catch(error => res.status(400).send(error));
  },

  add(req, res) {
    console.log(req.body);
    return db.Address.create({
      name: req.body.name,
      address: req.body.addressLine1,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      qbId: req.body.qbId
    })
      .then(address => res.status(201).send(address))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return db.Address.findByPk(req.params.id)
      .then(address => {
        if (!address) {
          return res.status(404).send({
            message: "Address Not Found"
          });
        }
        return address
          .update({
            CustomerName: req.body.CustomerName
          })
          .then(() => res.status(200).send(address))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    console.log(req.params);

    return db.Address.findByPk(req.params.id)
      .then(address => {
        console.log(address);
        if (!address) {
          return res.status(400).send({
            message: "Address Not Found"
          });
        }
        return address
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
