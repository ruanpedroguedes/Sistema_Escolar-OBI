const Aluno = require('../models/alunoModel');
const Professor = require('../models/professorModel');
const Coordenacao = require('../models/coordenacaoModel');

exports.registerUser = async (req, res) => {
    const { username, useremail, password, usertype, dateOfBirth, unidade, curso, turma, materia, funcao, local } = req.body;
    
    try {
        let userFields = { username, useremail, password, dateOfBirth, unidade, local }; 

        let newUser;
        if (usertype === 'aluno') {
            userFields.curso = curso;
            userFields.turma = turma;z
            newUser = new Aluno(userFields);
        } else if (usertype === 'professor') {
            userFields.materia = materia;
            newUser = new Professor(userFields);
        } else if (usertype === 'coordenacao') {
            userFields.funcao = funcao;
            newUser = new Coordenacao(userFields);
        }

        await newUser.save();
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            return res.status(400).json({ message: 'Email ou username já está em uso.' });
        }
        res.status(500).json({ message: 'Erro ao cadastrar usuário.', error: error.message });
    }
};
