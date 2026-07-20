const Order = require('../model/order');
const sendEmail = require('../utils/sendEmail');
const Razorpay = require('razorpay');

const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId } = req.body;

    if (items && items.length === 0 || !totalAmount || !address) {
      return res.status(400).json({ message: 'No order items' });
    }
    
      const createdOrder = await Order.create({
        user: req.user._id,
        items,
        totalAmount,
        address,
        paymentId
      });
 
   // Email is a side effect — never let it fail the order response
    try {
      const message = `
        <h2>Order Confirmation</h2>
        <p>Hello ${req.user.name},</p>
        <p>Your order has been successfully placed! Order ID: <strong>${createdOrder._id}</strong></p>
        <p>Total Amount Paid: ₹${totalAmount.toFixed(2)}</p>
        <p>It will be shipped to: ${address.street}, ${address.city}</p>
        <p>Thank you for shopping with ShopNest!</p>
      `;
      await sendEmail(req.user.email, `ShopNest - Order Confirmation`, message);
    } catch (emailErr) {
      console.error("Order confirmation email failed:", emailErr.message);
      // don't return/throw — order already succeeded
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.productId','name price');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      console.log("Order saved:", order);
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// RazorPay get way

const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ message: 'Amount is required' });

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };
    const razorpayOrder = await razorpayInstance.orders.create(options);
    res.status(200).json(razorpayOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, myOrders, getOrders, updateOrderStatus, createRazorpayOrder };