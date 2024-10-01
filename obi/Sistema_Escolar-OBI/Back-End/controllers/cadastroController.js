const User = require('../models/userModel'); 

exports.registerUser = async (req, res) => {
    const { username, useremail, password, usertype } = req.body;
    
    try {
        // Cria um novo usuário
        
        const newUser = new User({ username, useremail, password, usertype });
        await newUser.save();

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        // Verifica se o erro é de validação (por exemplo, email ou username já existente)
        if (error.name === 'MongoError' && error.code === 11000) {
            return res.status(400).json({ message: 'Email ou username já está em uso.' });
        }
        res.status(500).json({ message: 'Erro ao cadastrar usuário.', error: error.message });
    }
};
