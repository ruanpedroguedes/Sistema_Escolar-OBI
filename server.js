const express = require('express');
const app = express();
const mongoose = require('mongoose');
const conceitoRoutes = require('./routes/conceitoRoutes'); // Ajuste o caminho conforme necessário

app.use(express.json()); // Para parsing de JSON

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/seubancodedados', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB', err);
});

// Usar as rotas dos conceitos
app.use('/api/conceitos', conceitoRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
