module.exports = function(app) {
  const routeUser = require('../Controllers/User');

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
  app.route('/api/v1/register').post(routeUser.register);

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
  app.route('/api/v1/login').post(routeUser.login);

  //DEIXAR
  /**
   * @route GET /users/:id
   * @group Users - Operations about users
   * @param {string} id.param.required
   * @returns {Array} 200 - Returns UserSchema model
   * @returns {Error} 500
   */
  app.route('/api/v1/users/:id').get(routeUser.getUserById);

  //DEIXAR
  /**
   * @route GET /users/:id/validation
   * @group Users - Operations about users
   * @param {string} id.param.required
   * @returns {Array} 200 - Returns UserSchema model
   * @returns {Error} 500
   */
  app.route('/api/v1/users/:id/validation/:userId').put(routeUser.validateUser);

  /**
   * @route GET /users/admin/waitvalidation
   * @group Users - Operations about users
   * @returns {Array} 200 - Returns UserSchema model
   * @returns {Error} 500
   */
  //DEIXAR
  app
    .route('/api/v1/users/admin/waitvalidation')
    .get(routeUser.getUsersForValidation);
  //DEIXAR
  app.route('/api/v1/users/func/validUsers').get(routeUser.getValidUsers);

  //DEIXAR
  app.route('/api/v1/users/:id/balance/:balance').put(routeUser.updateBalance);
  //DEIXAR
  app.route('/api/v1/users/:id/balance').get(routeUser.getUserBalanceById);
};
