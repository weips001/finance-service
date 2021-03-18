'use strict';

module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/api/paymentOrder', controller.paymentOrder.list);
  router.get('/api/paymentOrder/:id', controller.paymentOrder.get);
  router.post('/api/paymentOrder', controller.paymentOrder.add);
  router.put('/api/paymentOrder/:id', controller.paymentOrder.update);
  router.delete('/api/paymentOrder', controller.paymentOrder.remove);
  router.post('/api/paymentOrder/submit', controller.paymentOrder.submit);
};
