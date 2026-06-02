const express = require('express');
const router = express.Router();
const {
  createOrganization,
  getMyOrganization,
  updateMyOrganization,
  getOrganizationById,
  verifyOrganization,
} = require('../controllers/organizationController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post('/', protect, authorize('Organization'), createOrganization);
router.get('/my-organization', protect, authorize('Organization'), getMyOrganization);
router.put('/my-organization', protect, authorize('Organization'), updateMyOrganization);
router.get('/:id', protect, authorize('Admin', 'Super Admin', 'Evaluator'), getOrganizationById);
router.put('/:id/verify', protect, authorize('Admin', 'Super Admin'), verifyOrganization);

module.exports = router;
