const express = require('express');
const { addNewCustomer, getCustomers, getDetails, delCustomer } = require('../controller');
const router = express.Router();

router.post('/', addNewCustomer);
router.get('/', getCustomers);
router.get('/:id', getDetails);
router.delete('/:id', delCustomer);

module.exports = router;