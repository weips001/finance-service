'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;

  router.post('/api/login', controller.home.login);
  router.post('/api/register', controller.home.register);

  require('./subject')(app);
  require('./role')(app);
  require('./user')(app);
  require('./specialExercises')(app);
  require('./company')(app)

  // router.get('/*', controller.home.index);
};