const express = require('express');
const router = express.Router();
const { getUsers, suspendUser, reactivateUser, getCategories, createCategory, getFlags, resolveFlag } = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.use(verifyToken, isAdmin);

router.get('/users', getUsers);
router.put('/users/:id/suspend', suspendUser);
router.put('/users/:id/reactivate', reactivateUser);

router.route('/categories')
  .get(getCategories)
  .post(createCategory);

router.get('/flags', getFlags);
router.put('/flags/:id/resolve', resolveFlag);

module.exports = router;
