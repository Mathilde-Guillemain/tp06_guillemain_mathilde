const { v4: uuidv4 } = require("uuid");
const db = require("../models");
const Utilisateurs = db.utilisateurs;
const Op = db.Sequelize.Op;

exports.login = (req, res) => {
  const { email, password } = req.body;

  let pattern = /^[A-Za-z0-9@.]{1,50}$/;
  if (pattern.test(email) && pattern.test(password)) {
    Utilisateurs.findOne({ where: { email } })
      .then(data => {
        if (data) {
          res.send({
            id: data.id,
            name: data.name,
            email: data.email
          });
        } else {
          res.status(404).send({
            message: `Cannot find Utilisateur with email=${email}.`
          });
        }
      })
      .catch(err => {
        res.status(400).send({
          message: "Error retrieving Utilisateur with email=" + email
        });
      });
  } else {
    res.status(400).send({ message: "Email ou password incorrect" });
  }
};

exports.get = (req, res) => {
  Utilisateurs.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.create = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ message: "Name, email et password sont requis." });
  }

  Utilisateurs.create({
    name,
    email,
    password
  })
    .then(user => res.status(201).send(user))
    .catch(err => res.status(500).send({ message: err.message }));
};

