const atendimentos = require('../models/atendimentos');

module.exports = app => {

    app.get('/atendimento', (req, res) => {

        atendimentos.lista(res);
    });

    app.get('/atendimento/:id', (req, res) => {

        const id = parseInt(req.params.id);

        atendimentos.buscaPorId(id, res);
    }); 

    app.post('/atendimento', (req, res) => {
        
        const atendimento = req.body;

        atendimentos.adiciona(atendimento, res);
    });

    app.patch('atendimento/:id', (req, res) => {

        const id = parseInt(req.params.id);
        const valores = req.body;

        atendimentos.alterar(id, valores, id);
    })
}