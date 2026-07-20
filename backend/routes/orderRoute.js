const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const {admin} = require("../middleware/adminMiddleware");
const {createOrder,getOrders, myOrders, updateOrderStatus,createRazorpayOrder} = require("../controllers/orderController");

const router = express.Router();

// all product see
router.route('/').post(protect,createOrder).get(protect, admin, getOrders);
// myOrder status
router.route('/myorders').get(protect, myOrders);
// specific product;
router.route('/:id/status').put(protect, admin, updateOrderStatus);

// orderRoute.js
router.post('/create-razorpay-order', protect, createRazorpayOrder);


module.exports = router;