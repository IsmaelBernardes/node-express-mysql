const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimentos {

    adiciona(atendimento, res) {

        const dataCriacao = moment().format("YYYY-MM-DD HH:mm:ss");
        const data  = moment(atendimento.data, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 4;

        const validacoes = [
            {
                nome: "data",
                valido: dataEhValida,
                mensagemErro: "Data deve ser maior ou igual a data atual"
            },
            {
                nome: "cliente",
                valido: clienteEhValido,
                mensagemErro: "Cliente deve ter pelo menos 4 caracteres"
            }
        ];

        const erros = validacoes.filter(campos => !campos.valido);
        const existeErros = erros.length

        if(existeErros){

            res.status(400).json(erros);
        }else{


            const atendimentoDatado = {...atendimento, dataCriacao, data};
            const sql = 'INSERT INTO Atendimentos SET ?';

            conexao.query(sql, atendimentoDatado, (err, results) => {
    
                if(err){
    
                    res.status(400).json(err);
                }else{
    
                    res.status(201).json(results);
                }
            })
        }

    }

    lista(res){

        const sql = 'SELECT * FROM Atendimentos';

        conexao.query(sql, (err, results) => {

            if(err){

                res.status(400).json(err);
            }else{

                res.status(200).json(results);
            }
        })
    }

    buscaPorId(id, res){

        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

        conexao.query(sql, (err, results) => {

            const atendimento = results[0];

            if(err){

                res.status(400).json(err);
            }else{

                res.status(200).json(atendimento);
            }
        })
    }

    alterar(id, valores, res){

    }
}

module.exports = new Atendimentos;