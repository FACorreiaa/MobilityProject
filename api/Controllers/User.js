'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('Users');

// função auxiliar para obter o _id do utilizador a partir do JWT enviado no pedido
const validateAdminAuth = (req, res, callback) => {
  // validar que os dados do JWT estão no request
  console.log(
    'token username:' + req.payload.username + ' role:' + req.payload.role
  );

  if (req.payload && req.payload.username && req.payload.role) {
    User.find(
      { username: req.payload.username }
      //, {"role": req.payload.role}
    ).exec((err, utilizador) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      } else if (!utilizador) {
        return res.status(404).json({ message: 'Utilizador não encontrado!' });
      } else if (req.payload.role !== 'admin') {
        console.log('Utilizador sem permissões de administrador!');
        return res
          .status(401)
          .json({ message: 'Utilizador sem permissões de administrador!' });
      }
      // executar o "callback", indicando qual é o utilizador
      callback(req, res, utilizador[0]._id);
      console.log('utilizador ID ' + utilizador[0]._id);
    });
  } else {
    return res.status(404).json({ message: 'Token inválido!' });
  }
};

//gets all users on db
exports.getUsers = function(req, res) {
  console.log('chamar getusers');
  validateAdminAuth(req, res, (req, res, utilizadorId) => {
    User.find({}, function(error, users) {
      if (error) {
        console.log(err);
        return res.json(error);
      }
      //console.log(users);
      return res.json(users);
    });
  });
};

//route for admin to get all users waiting registry validation
exports.getUsersForValidation = function(req, res) {
  validateAdminAuth(req, res, (req, res, utilizadorId) => {
    User.find({ waitValidation: { $ne: false } }, async function(err, user) {
      if (err) {
        return res.send(err);
      }
      await res.json(user);
    });
  });
};

// update user "valid = true"
// registeredby id user
// "waitValidation = false"
// insert new client
exports.validateUser = function(req, res) {
  validateAdminAuth(req, res, (req, res, utilizadorId) => {
    console.log('utilizadorId:' + utilizadorId);
    User.updateMany(
      { _id: req.params.id },
      {
        $set: { valid: true, registeredBy: utilizadorId, waitValidation: false }
      },
      function(err, result) {
        if (err) {
          res.send(err);
        } else {
          User.findById({ _id: req.params.id }, function(req, user) {
            console.log('result ' + result);
            console.log('user' + JSON.stringify(user));

            //creates client object

            /* const newClient = new Client();
          newClient.firstname = user.firstname;
          newClient.lastname = user.lastname;
          newClient
            .save()
            .then(result => {
              res.status(200).json("Validado e gerado cliente com sucesso!");
            })
            .catch(err => {
              res.status(500).jsonp({ error: { message: err.message } });
            }); */
          });
        }
      }
    );
  });
};

exports.getUserById = function(req, res) {
  validateAdminAuth(req, res, (req, res, utilizadorId) => {
    User.findById(req.params.id, function(err, user) {
      if (err) {
        return res.send(err);
      }
      return res.json(user);
    });
  });
};

exports.getUserRentals = async function(req, res) {
  User.findById(req.params.id, async function(err, user) {
    if (err) {
      await res.send(err);
    }
    let rentals = await user.rentals;
    Rental.find({ _id: { $in: rentals } }, async function(err, rental) {
      await res.json(rental);
    });
  });
};

//add new rental
exports.postUserRental = async function(req, res) {
  var newRental = new Rental(req.body);
  newRental
    .save()
    .then(result => {
      res.status(201).jsonp(newRental);
    })
    .catch(err => {
      res.status(500).jsonp({ error: { message: err.message } });
    });
};

//increment user Balance
exports.updateBalance = async function(req, res) {
  let _id = mongoose.Types.ObjectId(req.params.id);
  let query = { _id: _id };
  let newBalance = req.params.balance;
  User.findOneAndUpdate(
    query,
    { $inc: { balance: newBalance } },
    { upsert: true },
    async function(err, balance) {
      if (err) return await res.send(err);
      return await res.send(balance);
    }
  );
};
