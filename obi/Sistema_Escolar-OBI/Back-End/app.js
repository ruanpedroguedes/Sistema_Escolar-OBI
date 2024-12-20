const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const alunoRoute = require('./routes/alunoRoute');
const professorRoute = require('./routes/professorRoute');
const coordenacaoRoute = require('./routes/coordenacaoRoute');
const loginRoute = require('./routes/loginRoute');
const alunoPostRoute = require('./routes/alunoPostRoute');
const alunoGetRoute = require('./routes/alunoGetRoute');
const responsaveisRoute = require('./routes/responsaveisRoute');
const cadastramentoRoute = require('./routes/cadastramentoRoute');
const disciplinaRoute = require('./routes/disciplinaRoute');
const boletimRoutes = require('./routes/boletimRoutes');
const avisoRoute = require('./routes/avisoRoute');
const agendaRoutes = require('./routes/agendaRoute');
const funcionariosRoute = require('./routes/funcionariosRoute');
const conceitoRoute = require('./routes/conceitoRoute');
const conceitoCoordenacaoRoute = require('./routes/conceitocoordenacaoRoute');
const turmaRoute = require('./routes/turmaRoute');
const comunicadoRoute = require('./routes/comunicadoRoute');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.use('/api/comunicados', comunicadoRoute);
app.use('/api/turmas', turmaRoute);
app.use('/api/conceitos', conceitoRoute);
app.use('/api/conceitos-coordenacao', conceitoCoordenacaoRoute);
app.use('/api/avisos', avisoRoute);
app.use('/api/boletim', boletimRoutes);
app.use('/api/disciplinaRoute', disciplinaRoute);
app.use('/api/cadastramentoRoute', cadastramentoRoute);
app.use('/api/turmaRoutes', turmaRoute);
app.use('/api/responsaveis', responsaveisRoute);
app.use('/api/alunoGet', alunoGetRoute);
app.use('/api/alunosPost', alunoPostRoute);
app.use('/api/alunos', alunoRoute);
app.use('/api/professores', professorRoute);
app.use('/api/coordenacao', coordenacaoRoute);
app.use('/api/login', loginRoute);
app.use('/api/agendaRoute', agendaRoutes);
app.use('/api/funcionarios', funcionariosRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
