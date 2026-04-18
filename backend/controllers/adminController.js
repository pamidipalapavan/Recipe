const User = require('../models/User');
const Category = require('../models/Category');
const Flag = require('../models/Flag');

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const suspendUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'suspended' }, { new: true }).select('-password');
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const reactivateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'active' }, { new: true }).select('-password');
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getFlags = async (req, res) => {
  try {
    const flags = await Flag.find().populate('recipe', 'title');
    res.json({ success: true, count: flags.length, data: flags });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const resolveFlag = async (req, res) => {
  try {
    const flag = await Flag.findByIdAndUpdate(req.params.id, { status: 'reviewed' }, { new: true });
    res.json({ success: true, data: flag });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getUsers, suspendUser, reactivateUser, getCategories, createCategory, getFlags, resolveFlag };
