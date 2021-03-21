'use strict';

module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/api/user', controller.user.list);
  router.get('/api/currentUser', jwt, controller.user.getCurrentUser);
  router.get('/api/user/:id', controller.user.get);
  router.post('/api/user', controller.user.add);
  router.put('/api/user/:id', controller.user.update);
  router.delete('/api/user', controller.user.remove);
  router.post('/api/addUserByCode', controller.user.addUserByCode);
  router.post('/api/getUserFromOpenid', controller.user.getUserFromOpenid);
};
