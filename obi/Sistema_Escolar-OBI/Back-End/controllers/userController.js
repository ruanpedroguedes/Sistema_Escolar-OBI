const User = require('../models/alunoModel')

exports.getUsers = async (req, res) => {
   try {
     const users = await User.find()
     res.json(users)     
   } catch (error) {
      res.status(500).json({error: error.message})    
   }       
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
 } catch (error) {
   res.status(500).json({ error: error.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
        

exports.deleteUser = async (req, res) => {
  try {
     await User.findByIdAndDelete(req.params.id);
     res.json({ message: 'User deleted' });
 }   catch (error) {
    res.status(500).json({ error: error.message });
  }
};
        