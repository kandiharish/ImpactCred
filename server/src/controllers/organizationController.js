const Organization = require('../models/Organization');
const User = require('../models/User');

// @desc    Create a new organization profile
// @route   POST /api/organizations
// @access  Private (Organization role)
const createOrganization = async (req, res) => {
  try {
    const { name, type, registrationNumber, website, address, logoUrl } = req.body;

    // Check if user already has an organization
    const user = await User.findById(req.user._id);
    if (user.organizationId) {
      return res.status(400).json({ message: 'User is already associated with an organization profile' });
    }

    // Check if registration number is already registered
    const orgExists = await Organization.findOne({ registrationNumber });
    if (orgExists) {
      return res.status(400).json({ message: 'Organization with this registration number already exists' });
    }

    // Create organization
    const organization = await Organization.create({
      name,
      type,
      registrationNumber,
      website,
      address,
      logoUrl,
    });

    if (organization) {
      // Associate with user
      user.organizationId = organization._id;
      await user.save();

      res.status(201).json(organization);
    } else {
      res.status(400).json({ message: 'Invalid organization data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user's organization profile
// @route   GET /api/organizations/my-organization
// @access  Private (Organization role)
const getMyOrganization = async (req, res) => {
  try {
    if (!req.user.organizationId) {
      return res.status(404).json({ message: 'No organization profile found for this user' });
    }

    const organization = await Organization.findById(req.user.organizationId);

    if (!organization) {
      return res.status(404).json({ message: 'Organization profile not found' });
    }

    res.json(organization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update current user's organization profile
// @route   PUT /api/organizations/my-organization
// @access  Private (Organization role)
const updateMyOrganization = async (req, res) => {
  try {
    if (!req.user.organizationId) {
      return res.status(404).json({ message: 'No organization profile found for this user' });
    }

    const organization = await Organization.findById(req.user.organizationId);

    if (!organization) {
      return res.status(404).json({ message: 'Organization profile not found' });
    }

    const { name, type, registrationNumber, website, address, logoUrl } = req.body;

    organization.name = name || organization.name;
    organization.type = type || organization.type;
    organization.registrationNumber = registrationNumber || organization.registrationNumber;
    organization.website = website !== undefined ? website : organization.website;
    organization.address = address || organization.address;
    organization.logoUrl = logoUrl !== undefined ? logoUrl : organization.logoUrl;

    const updatedOrg = await organization.save();
    res.json(updatedOrg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get organization by ID
// @route   GET /api/organizations/:id
// @access  Private (Admin, Evaluator, Super Admin)
const getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    res.json(organization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify organization profile
// @route   PUT /api/organizations/:id/verify
// @access  Private (Admin, Super Admin)
const verifyOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    organization.verified = true;
    const updatedOrg = await organization.save();

    res.json(updatedOrg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrganization,
  getMyOrganization,
  updateMyOrganization,
  getOrganizationById,
  verifyOrganization,
};
