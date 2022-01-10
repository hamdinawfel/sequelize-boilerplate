const User = require("../models").User;

module.exports = {
  signup(req, res) {
    return User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.status(200).send(user))
      .catch((error) => {
        res.status(400).send(error.message);
      });
  },
};
