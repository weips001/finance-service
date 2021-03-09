'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/company', controller.company.list);
  router.get('/api/company/:id', controller.company.get);
  router.post('/api/company', controller.company.add);
  router.put('/api/company/:id', controller.company.update);
  router.delete('/api/company/:id', controller.company.remove);
};
