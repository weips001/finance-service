'use strict';

module.exports = app => {
  const { router, controller, jwt } = app;
  // router.get('/api/test', controller.test.list);
  // router.get('/api/currenttest', jwt, controller.test.getCurrenttest);
  // router.get('/api/test/:id', controller.test.get);
  router.post('/api/test', controller.test.add);
  // router.put('/api/test/:id', controller.test.update);
  // router.delete('/api/test', controller.test.remove);
};
