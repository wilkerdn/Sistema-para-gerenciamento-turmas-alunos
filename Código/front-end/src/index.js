import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Turma extends React.Component{
  buscarTurma(){
    axios.get('http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3001/buscarTurma').then(data => {
      var id_turma = []
      var nome_turma = []
      var curso = []
      var data_inicio = [] 
      var turma = ''
      id_turma[0] = 'n'
      for(var i = 0; i < data.data.length; i++){
        id_turma[i] = data.data[i]._id
        nome_turma[i] = data.data[i].nome_turma
        curso[i] = data.data[i].curso 
        data_inicio[i] = data.data[i].data_inicio
        turma = turma + 'Id: ' + id_turma[i] + '\nNome da turma: ' + nome_turma[i] +'\nCurso: ' + curso[i] + '\nData início: ' + data_inicio[i] + '\n\n';
      }
      console.log(turma)
    })
  }

  buscarAluno(){
    axios.get('http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3001/buscarAluno').then(data => {
      var id_aluno = []
      var nome_aluno = []
      var id_turma = []
      var data_matricula= [] 
      for(var i = 0; i < data.data.length; i++){
        id_aluno[i] = data.data[i]._id
        nome_aluno[i] = data.data[i].nome_aluno
        id_turma[i] = data.data[i].id_turma
        data_matricula[i] = data.data[i].data_matricula
      }
      alert(id_aluno[0])
      this.criarTabela(id_aluno, nome_aluno, id_turma, data_matricula, i)
    })
  }

  state = {
    alunos : [],
    turmas : []
  }

  componentDidMount(){
      axios.get('http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3001/buscarAluno').then(data => {
        const alunos = data.data;
        this.setState({ alunos });
        })
        axios.get('http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3001/buscarTurma').then(data => {
        const turmas = data.data;
        this.setState({ turmas });
        })
  }

  mostrarTabelaAluno(){
    document.getElementById('container-table').style.display = 'block';
  }
  
  mostrarTabelaTurma(){
    document.getElementById('container-table-turma').style.display = 'block';
  }
  render(){
    return(
      <div name='escola'>
        <div id='turma'>
          <h1 id='titTurmas'>TURMAS</h1>
          <div id='criarTurma'>
            <h2 id='addTurma'>Inserir turma</h2>
            <form method='post' action='http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3001/inserirTurma'>
            <div>
                <label>Nome da turma:</label>
                <input type='text' name='nome_turma' />
              </div>
              <div>
                <label>Curso:</label>
                <input type='text' id='c' name='curso' />
              </div>
              <div>
                <label>Data de início:</label>
                <input type='date' name='data_inicio' />
              </div>
              <div id='botIns'>
                <button id='bInsTurma' type='submit'>Salvar</button>
              </div>
            </form>
          </div>
          <div id='atualizarTurma'>
            <h2 id='atTurma'>Atualizar turma</h2>
            <form method='post' action='http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3001/atualizarTurma/'>
              <div>
                <label>Nome da turma:</label>
                <input type="text" name='nome_turma_antigo' />
              </div>
              <div>
                <label>Novo nome:</label>
                <input type='text' name='nome_turma' />
              </div>
              <div>
                <label>Curso:</label>
                <input type='text' name='curso' />
              </div>
              <div>
                <label>Data de início:</label>
                <input type='date' name='data_inicio' />
              </div>
              <div id='bAtu'>
                <button id='bAtualizar' type='submit'>Atualizar</button>
              </div>
            </form>
          </div>

          <div id='deletarTurma'>
          <h2 id='delTurma'>Deletar turma</h2>
            <form method='post' action='http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3001/deletarTurma/'>
              <div>
                <label>Nome da turma: </label>
                <input type='text' name='nome_turma' />
              </div>
              <div id='bDel'>
                <button id='bDeletar' type='submit'>Excluir</button>
              </div>
            </form> 
          </div>

          <div id='pesquisarTurma'>
          <h2 id='pesqTurma'>Pesquisar turma(s)</h2>
              <div id='bPes'>
                <button id='bPesquisar' onClick={this.mostrarTabelaTurma}>Pesquisar</button>
              </div>
          </div>
        </div>
        

        <div id = 'container-table-turma'>
            <table id='tabelaTurma'>
                <tr id='titulo'>
                    <td scope="col">Id Turma</td>
                    <td scope="col">Nome da turma</td>
                    <td scope="col">Curso</td>
                    <td scope='col'>Data início</td>
                </tr>
                { this.state.turmas.map(turmas=>
                <tr>
                  <td>{turmas._id}</td>
                  <td>{turmas.nome_turma}</td>
                  <td>{turmas.curso}</td>
                  <td>{turmas.data_inicio}</td>
                </tr>)}
            </table>
        </div>

        <div id='aluno'>
        <h1 id='titAluno'>ALUNOS</h1>
          <div id='criarAluno'>
            <h2 id='addTurma'>Inserir aluno</h2>
            <form method='post' action='http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3001/inserirAluno'>
              <div>
                <label>Id da turma:</label>
                <input type='text' name='id_turma' />
              </div>
              <div>
                <label>Nome:</label>
                <input type='text' name='nome_aluno' />
              </div>
              <div>
                <label>Data matrícula:</label>
                <input type='date' name='data_matricula' />
              </div>
              <div id='botIns'>
                <button id='bInsTurma' type='submit'>Salvar</button>
              </div>
            </form>
          </div>

          <div id='atualizarAluno'>
          <h2 id='atAluno'>Atualizar aluno</h2>
            <form method='post' action='http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3001/atualizarAluno/'>
            <div>
                <label>Nome:</label>
                <input type='text' name='nome_aluno_antigo' />
              </div>
            <div>
                <label>Id da turma:</label>
                <input type='text' name='id_turma' />
              </div>
              <div>
                <label>Novo nome:</label>
                <input type='text' name='nome_aluno' />
              </div>
              <div>
                <label>Data matrícula:</label>
                <input type='date' name='data_matricula' />
              </div>
              <div id='bAtu'>
                <button id='bAtualizar' type='submit'>Atualizar</button>
              </div>
            </form>
          </div>

          <div id='deletarAluno'>
          <h2 id='delAluno'>Deletar aluno</h2>
            <form method='post' action='http://ec2-54-232-228-119.sa-east-1.compute.amazonaws.com:3001/deletarAluno/'>
              <div>
                <label>Nome: </label>
                <input type='text' name='nome_aluno' />
              </div>
              <div id='bDel'>
                <button id='bDeletar' type='submit'>Excluir</button>
              </div>
            </form> 
          </div>

          <div id='pesquisarAluno'>
          <h2 id='delAluno'>Pesquisar aluno(s)</h2>
              <div id='bPes'>
                <button id='bPesquisar' onClick={this.mostrarTabelaAluno}>Pesquisar</button>
              </div>
          </div>
        </div>

        <div id = 'container-table'>
            <table id='tabelaAluno'>
                <tr id='titulo'>
                    <td scope="col">Id Aluno</td>
                    <td scope="col">Nome</td>
                    <td scope='col'>Id Turma</td>
                    <td scope='col'>Data matrícula</td>
                </tr>
                { this.state.alunos.map(alunos =>
                <tr>
                  <td>{alunos._id}</td>
                  <td>{alunos.nome_aluno}</td>
                  <td>{alunos.id_turma}</td>
                  <td>{alunos.data_matricula}</td>
                </tr>)}
            </table>
        </div>
      </div>
      )
  }
}

ReactDOM.render(
  <Turma />,
  document.getElementById('root')
);