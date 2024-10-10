const Professor = require('../models/professorModel');
const Coordenacao = require('../models/coordenacaoModel');
const bcrypt = require('bcryptjs');

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verifica se o usuário existe como professor
        let user = await Professor.findOne({ username: username });

        // Se não encontrar como professor, verifica como coordenador
        if (!user) {
            user = await Coordenacao.findOne({ username: username });
        }

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Verifica se a senha está correta
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta.' });
        }

        // Se o login for bem-sucedido, retorna o tipo de usuário
        const usertype = user instanceof Professor ? 'Professor' : 'Coordenação';
        res.status(200).json({ message: 'Login bem-sucedido.', usertype: usertype });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao realizar login.', error: error.message });
    }
};
