'use strict';

module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/api/bill', controller.bill.list);
  router.get('/api/bill/:id', controller.bill.get);
  router.post('/api/bill', controller.bill.add);
  router.put('/api/bill/:id', controller.bill.update);
  router.delete('/api/bill', controller.bill.remove);
};
