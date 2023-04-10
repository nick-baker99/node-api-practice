const User = require('../model/User');

const getAllUsers = async (req, res) => {
  const response = await User.find({});
  if (!response) return res.status(204).json({ 'message': 'No users found' });
  res.json(response);
};

const getUser = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ 'message': 'User ID required' });
  const response = await User.findOne({ _id: req.params.id }).exec();
  if (!response) return res.status(204).json({ "message": `User ID ${req.params.id} not found` });

  res.json(response);
};

module.exports = { getAllUsers, getUser };