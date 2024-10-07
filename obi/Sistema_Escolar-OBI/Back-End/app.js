const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Importa o middleware cors
const alunoRoute = require('./routes/alunoRoute');
const professorRoute = require('./routes/professorRoute');
const coordenacaoRoute = require('./routes/coordenacaoRoute');
const professorDisciplineRoute = require('./routes/professorDisciplineRoutes');
const studentClassRoute = require('./routes/studentClassRoutes');
const disciplineRoute = require('./routes/disciplineRoutes');
const comunicationsRoute = require('./routes/communicationsRoutes');
const classRoute = require('./routes/classRoutes');
const classDisciplineRoute = require('./routes/classDiciplineRoutes');
const loginRoute = require('./routes/loginRoute');
const alunoPostRoute = require('./routes/alunoPostRoute')
const alunoGetRoute = require('./routes/alunoGetRoute')
const responsaveisRoute = require('./routes/responsaveisRoute'); // Certifique-se de que este caminho está correto

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

<<<<<<< HEAD

app.use('/api/cadastramentoRoute', cadastramentoRoute);
=======
// Definindo as rotas
app.use('/api/responsaveis', responsaveisRoute); // Adicione esta linha
app.use('/api/alunoGet', alunoGetRoute)
app.use('/api/alunosPost', alunoPostRoute)
app.use('/api/alunos', alunoRoute);
app.use('/api/professores', professorRoute);
app.use('/api/coordenacao', coordenacaoRoute);
>>>>>>> 4de325c4bdd483a436627194b222cbb1651530e7
app.use('/api/login', loginRoute);
app.use('/api/professors', professorDisciplineRoute);
app.use('/api/students', studentClassRoute);
app.use('/api/discipline', disciplineRoute);
app.use('/api/communications', comunicationsRoute);
app.use('/api/classes', classRoute);
app.use('/api/class-disciplines', classDisciplineRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
