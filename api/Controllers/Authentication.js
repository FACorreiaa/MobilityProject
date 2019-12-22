'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('Users');

//for authentications
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//passport validate user and password
passport.use(new LocalStrategy(
  { usernameField: 'username' },

  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'O username está incorreto.' });
      }
      if (!user.validarPassword(password)) {
        return done(null, false, { message: 'A palavra chave está incorreta!' });
      }
      return done(null, user);
    });
  }
));
//add new user
exports.register = async function (req, res) {

  const params = (req.body.username && req.body.email && req.body.password);
  console.log(req.body);
  if (!params) {
    return res
      .status(400)
      .json({ "message": "Necessário preencher todos os campos!" });
  }
  const newUser = new User();
  newUser.username = req.body.username;
  newUser.email = req.body.email;
  newUser.dadosPassword = { hash: '', salt: '' };
  newUser.setDadosPassword(req.body.password);

  newUser.save((err) => {
    if (err) {
      res
        .status(500)
        .json(err);
    } else {
      res
        .status(200)
        .json("Utilizador registado com sucesso!");
    }
  });
};


//user login
exports.login = async function (req, res) {
  const params = (req.body.username && req.body.password)
  if (!params) {
    return res
      .status(400)
      .json({ "message": "Necessário preencher todos os campos!" });
  }
  passport.authenticate('local', (err, user, info) => {
    let token;
    if (err) {
      return res
        .status(404)
        .json(err);
    }
    if (user) {
      token = user.gerarJwt();
      res
        .status(200)
        .json({ token });
    } else {
      res
        .status(401)
        .json(info);
    }
  })(req, res);


};