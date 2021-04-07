'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;

  router.post('/api/login', controller.login.login);
  router.post('/api/register', controller.login.register);
  router.post('/api/wxLogin', controller.wxLogin.wxLogin);
  router.post('/api/wxGetToken', controller.wxLogin.wxGetToken)
  router.get('/api/init', controller.init.init);
  // router.get('/api/test', controller.test.test);

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