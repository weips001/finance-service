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
  router.post('/api/wxLogin', controller.wxLogin.wxLogin);

  require('./subject')(app);
  require('./role')(app);
  require('./user')(app);
  require('./specialExercises')(app);
  require('./company')(app)
  require('./bill')(app)
  require('./paymentOrder')(app)
  require('./test')(app)

  // router.get('/*', controller.home.index);
};