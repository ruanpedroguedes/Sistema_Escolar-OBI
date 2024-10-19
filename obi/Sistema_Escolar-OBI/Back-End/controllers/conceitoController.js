const Conceito = require('../models/conceitoModel');

const calcularConceitoFinal = (av1, av2, av3) => {
    const conceitos = [av1, av2, av3];
    const countA = conceitos.filter(c => c === 'A').length;
    const countPA = conceitos.filter(c => c === 'PA').length;
    const countNA = conceitos.filter(c => c === 'NA').length;

    if (countNA > 0) return 'NA';
    if (countPA >= 2) return 'PA';
    if (countA === 3) return 'A';
    if (countA === 2 && countPA === 1) return 'A';
    return 'PA';
};

exports.saveConceito = async (req, res) => {
    try {
        const { alunoId, materia, av1, av2, av3 } = req.body;
        const conceitoFinal = calcularConceitoFinal(av1, av2, av3);

        const conceito = new Conceito({
            alunoId,
            materia,
            av1,
            av2,
            av3,
            conceitoFinal
        });

        await conceito.save();
        res.status(201).json(conceito);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
