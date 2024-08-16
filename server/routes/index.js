const router = require('express').Router();
const { getMenuItems, putTransactionCount } = require('../controller');
const customerRoutes = require('./customerRoutes');

router.use("/customers", customerRoutes)
router.get("/menu", getMenuItems)
router.put("/update-count/:id", putTransactionCount)

module.exports = router