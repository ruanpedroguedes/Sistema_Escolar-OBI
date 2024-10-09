const Professor = require('../models/professorModel');
const Coordenacao = require('../models/coordenacaoModel');

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verifica se o usuário existe em ambas as coleções
        let user = await Professor.findOne({ username: username });
        if (!user) {
            user = await Coordenacao.findOne({ username: username });
        }

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Verifica se a senha está correta
        if (user.password !== password) {
            return res.status(400).json({ message: 'Senha incorreta.' });
        }

        // Se o login for bem-sucedido, retorna o tipo de usuário
        res.status(200).json({ message: 'Login bem-sucedido.', usertype: user.usertype });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao realizar login.', error: error.message });
    }
};
