const User = require('../models/userModel');

exports.registerUser = async (req, res) => {
    const { username, useremail, password, usertype, dateOfBirth, curso, turma, materia, funcao } = req.body;
    
    try {
        let userFields = { username, useremail, password, usertype, dateOfBirth };

        // Verificação de campos específicos com base no tipo de usuário
        if (usertype === 'aluno') {
            userFields.curso = curso;
            userFields.turma = turma;
        } else if (usertype === 'professor') {
            userFields.materia = materia;
        } else if (usertype === 'coordenacao') {
            userFields.funcao = funcao;
        }

        const newUser = new User(userFields);
        await newUser.save();

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            return res.status(400).json({ message: 'Email ou username já está em uso.' });
        }
        res.status(500).json({ message: 'Erro ao cadastrar usuário.', error: error.message });
    }
};
