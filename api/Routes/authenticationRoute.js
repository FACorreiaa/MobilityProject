module.exports = function(app) {
  const routeAuth = require('../Controllers/Authentication');

  //DEIXAR
  /**
   * @route POST /register
   * @group Users - Operations about users
   * @param {string} username.body.required - username of the user -
   * @param {string} firstname.body.required - firstname
   * @param {string} lastname.body.required - lastname
   * @param {string} email.body.required - email
   * @param {string} password.body.required - password
   * @param {enum} role.body.required  Values that need to be considered for role - eg: guest,client,employee,admin
   * @param {string} username.body.required - username
   * @returns {object} 201 - Utilizador criado com sucesso - Utilizador registado com sucesso!
   * @returns {object} 400 - Necessário preencher todos os campos!
   * @returns {Error}  500
   */
  app.route('/api/v1/register').post(routeAuth.register);

  //DEIXAR
  /**
   * @route POST /login
   * @group Users - Operations about users
   * @param {string} username.body.required - username of the user
   * @param {string} password.body.required - password
   * @returns {object} 200 - {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGZmYzdiNDc1YTIwZDExMTg0NTJmOTEiLCJ1c2VybmFtZSI6Impvc2VfZW1wbG95ZWUiLCJlbWFpbCI6Impvc2VAZ21haWwuY29tIiwicm9sZSI6ImVtcGxveWVlIiwiZXhwIjoxNTc4NzgzMTI3LCJpYXQiOjE1NzgxNzgzMjd9.SdGUE8-lAYWbEFZxRSA_cNmPgwmIrCohh5lE4iHvVjs"}
   * @returns {object} 400 - Necessário preencher todos os campos!
   * @returns {Error}  500
   */
  app.route('/api/v1/login').post(routeAuth.login);
};
