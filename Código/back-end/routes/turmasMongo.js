const express = require('express');
const router = express.Router();
const conexao = require('../config/mongoBD')
var cors = require('cors')

var corsOptions = {
    origin : 'http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3000',
    optionSucessStatus : 200
}

const turmasSchema = new conexao.Schema({
    nome_turma : String,
    curso : String,
    data_inicio : Date
})

const alunosSchema = new conexao.Schema({
    id_turma : String,
    nome_aluno : String,
    data_matricula : Date
})

const turmasModel = conexao.model('turmas', turmasSchema)
const alunosModel = conexao.model('alunos', alunosSchema)

//Inserir turmas
router.post('/inserirTurma', (req, res) => {
    var resposta = {}
    var dado = {
        nome_turma : req.body.nome_turma,
        curso : req.body.curso,
        data_inicio : req.body.data_inicio
    }
    turmasModel.insertMany(dado, (erro, resultado) => {
        if(erro){
            resposta.status = "erro",
            resposta.dados = erro,
            resposta.mensagem = "Erro ao inserir uma nova turma",
            res.send('<script>window.alert("Erro ao inserir uma nova turma");location.href="http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3000"</script>');
        }else{
            resposta.status = "Ok",
            resposta.dados = resultado,
            resposta.mensagem = "Sucesso ao inserir uma nova turma",
            res.send('<script>alert("Sucesso ao inserir uma nova turma");location.href="http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3000"</script>')
        }
    })
})

//Inserir alunos
router.post('/inserirAluno', (req, res) => {
    var resposta = {}
    var dado = {
        id_turma : req.body.id_turma,
        nome_aluno : req.body.nome_aluno,
        data_matricula : req.body.data_matricula
    }
    alunosModel.insertMany(dado, (erro, resultado) => {
        if(erro){
            resposta.status = "erro",
            resposta.dados = erro,
            resposta.mensagem = "Erro ao inserir o aluno",
            res.send('<script>alert("Erro ao inserir uma nova turma");location.href="http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3000"</script>');
        }else{
            resposta.status = "Ok",
            resposta.dados = resultado,
            res.send('<script>alert("Sucesso ao inserir o aluno");location.href="http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3000"</script>')
        }
    })
})

//Atualizar turmas
router.post('/atualizarTurma/', (req, res) => {
    var resposta = {}
    var dado = {
        nome_turma_antigo : req.body.nome_turma_antigo,
        nome_turma : req.body.nome_turma,
        curso : req.body.curso,
        data_inicio : req.body.data_inicio
    }
    var aux = dado.nome_turma_antigo
    turmasModel.updateOne({nome_turma : aux}, dado, (erro, resultado) => {
        if(erro){
            resposta.status = "erro",
            resposta.dados = erro,
            resposta.mensagem = "Erro ao atualizar a turma",
            res.send('<script>alert("Erro ao atualizar a turma");location.href="http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3000"</script>');
        }else{
            resposta.status = "Ok",
            resposta.dados = resultado,
            resposta.mensagem = "Sucesso ao atualizar a turma",
            res.send('<script>alert("Sucesso ao atualizar a turma");location.href="http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3000"</script>');
        }
    })
})

//Atualizar alunos
router.post('/atualizarAluno/', (req, res) => {
    var resposta = {}
    var dado = {
        nome_aluno_antigo : req.body.nome_aluno_antigo,
        id_turma : req.body.id_turma,
        nome_aluno : req.body.nome_aluno,
        data_matricula : req.body.data_matricula
    }
    var aux2 = dado.nome_aluno_antigo
    alunosModel.updateOne({nome_aluno : aux2}, dado, (erro, resultado) => {
        if(erro){
            resposta.status = "erro",
            resposta.dados = erro,
            resposta.mensagem = "Erro ao atualizar o aluno",
            res.send('<script>alert("Erro ao atualizar o aluno");location.href="http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3000"</script>');
        }else{
            resposta.status = "Ok",
            resposta.dados = resultado,
            resposta.mensagem = "Sucesso ao atualizar o aluno",
            res.send('<script>alert("Sucesso ao atualizar o aluno");location.href="http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3000"</script>');
        }
    })
})

//Deletar turma
router.post('/deletarTurma', (req, res) => {
    var resposta = {}
    var dado = {
        nome_turma : req.body.nome_turma,
    }
    var aux = dado.nome_turma
    turmasModel.deleteOne({nome_turma : aux}, (erro, resultado) => {
        if(erro){
            resposta.status = "erro",
            resposta.dados = erro,
            resposta.mensagem = "Erro ao deletar a turma",
            res.send('<script>alert("Erro ao deletar a turma");location.href="http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3000"</script>');
        }else{
            resposta.status = "Ok",
            resposta.dados = resultado,
            resposta.mensagem = "Sucesso ao deletar a turma",
            res.send('<script>alert("Sucesso ao deletar a turma");location.href="http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3000"</script>');
        } 
    })
})

//Deletar aluno
router.post('/deletarAluno', (req, res) => {
    var resposta = {}
    var dado = {
        nome_aluno : req.body.nome_aluno
    }
    var aux = dado.nome_aluno
    alunosModel.deleteOne({nome_aluno : aux}, (erro, resultado) => {
        if(erro){
            resposta.status = "erro",
            resposta.dados = erro,
            resposta.mensagem = "Erro ao deletar o aluno",
            res.send('<script>alert("Erro ao deletar o aluno");location.href="http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3000"</script>');
        }else{
            resposta.status = "Ok",
            resposta.dados = resultado,
            resposta.mensagem = "Sucesso ao deletar o aluno",
            res.send('<script>window.alert("Sucesso ao deletar o aluno");location.href="http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3000"</script>');
        } 
    })
})

//Buscar turma
router.get('/buscarTurma', cors(corsOptions), (req, res) => {
    var resposta = {}
    turmasModel.find((erro, resultado) => {
        if(erro){
            resposta.status = "erro",
            resposta.dados = erro,
            resposta.mensagem = "Erro ao buscar a(s) turma(s)",
            res.send('<script>alert("Erro ao buscar a(s) turma(s)");location.href="http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3000"</script>');
        }else{
            resposta.status = "Ok",
            resposta.dados = resultado,
            resposta.mensagem = "Sucesso ao buscar a(s) turma(s)",
            res.send(resultado);
        }
    });
})

//Buscar aluno
router.get('/buscarAluno', cors(corsOptions), (req, res) => {
    var resposta = {}
    alunosModel.find((erro, resultado) => {
        if(erro){
            resposta.status = "erro",
            resposta.dados = erro,
            resposta.mensagem = "Erro ao busca o(s) aluno(s)",
            res.send('<script>alert("Erro ao buscar o(s) aluno(s)");location.href="http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3000"</script>');
        }else{
            resposta.status = "Ok",
            resposta.dados = resultado,
            resposta.mensagem = "Sucesso ao buscar o(s) aluno(s)",
            res.send(resultado)
        }
    });
})

module.exports = router