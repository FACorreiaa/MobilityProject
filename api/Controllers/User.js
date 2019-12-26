'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('Users');

// função auxiliar para obter o _id do utilizador a partir do JWT enviado no pedido
const validateAdminAuth = (req, res, callback) => {
  // validar que os dados do JWT estão no request
  console.log('username:' + req.payload.username + ' role:' + req.payload.role)
  
  if (req.payload && req.payload.username && req.payload.role) { 
      User
         // .findOne({ username: req.payload.username }) // procurar um utilizador pelo seu "username"
         .find({ "username": req.payload.username}, {"role": req.payload.role})
         .exec((err, utilizador) => {
          console.log('admin = ' + (req.payload.role !== 'admin'))
              if (err) {
                console.log('IF 1')
                console.log(err);
                return res
                .status(500)
                .json(err);
              }
              else if (!utilizador ) {
                console.log('IF 2')
                  return res
                      .status(404)
                      .json({ "message": "Utilizador não encontrado!" });
              } 
              else if (req.payload.role !== 'admin'){
                console.log('IF 3')
                console.log('Utilizador sem permissões de administrador!')
                return res
                      .status(401)
                      .json({ "message": "Utilizador sem permissões de administrador!" });
              }
              // executar o "callback", indicando qual é o utilizador
              callback(req, res, utilizador._id); 
          });
  } else {
      return res
          .status(404)
          .json({ "message": "Token inválido!"  });
  }
};


//gets all users on db
exports.getUsers = function(req, res) {
  validateAdminAuth(req, res, 
    (req, res, utilizadorId) => {
      User.find({}, function(error, users) {
        if (error) {
          console.log(err);
          return res.json(error);
        }
        //console.log(users);
        return res.json(users);
      })
    })
};


//route for admin to get all users waiting registry validation
exports.getUsersForValidation = function(req, res) {
  User.find({waitValidation: {$ne: false}}, async function(err, user) {
    if (err) {
      return res.send(err);
    }
    await res.json(user);
  });
};

//update user "valid = true" and insert new client
exports.validateUser = function(req, res, user) {
  User.update(
    { _id: req.params.id },
    { $set: { "valid": true } },
    function(err, user) {
      if (err) res.send(err);
      console.log(user);
      res.json("Validado com sucesso!");
    }
  );
};



//add new rental
exports.postClientRental = async function (req, res){
  var newRental = new Rental(req.body);
    newRental.save()
        .then(result => {
           console.log(newRental)
           res.status(201).jsonp(newRental) })
        .catch(err => {
            res.status(500).jsonp({ error: { message: err.message } })
        })
};