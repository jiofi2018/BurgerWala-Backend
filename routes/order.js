const router = require('express').Router()
const { putOrder, getMyOrder, getOrderDetails, getAdminOrders, processOrder } = require('../Controllers/order')
const {isAuth, isAdmin} = require("../Utils/isauth")

router.post('/putorder',isAuth, putOrder);
router.get('/myorders',isAuth, getMyOrder);
router.get('/order/:id',isAuth, getOrderDetails);
router.get('/admin/order',isAuth, isAdmin, getAdminOrders);
router.get('/admin/processorder/:id',isAuth, isAdmin, processOrder);

module.exports = router;