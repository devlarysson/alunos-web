import { ChangeEvent, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client'
import { FaEdit, FaTimes } from 'react-icons/fa'

import { Aluno } from '../../interfaces/Aluno'

import './styles.css';

interface AlunosQueryData {
  alunos: Aluno[]
}

const ALUNOS_QUERY = gql`
  query GetAlunos($busca: String) {
    alunos(busca: $busca) {
      id,
      nome,
      email,
      cpf
    }
  }
`

const REMOVER_ALUNO_MUTATION = gql`
  mutation RemoverAluno($id: Int!) {
    removerAluno(id: $id) {
      nome,
      email,
      cpf
    }
  }
`

export const AlunoList = () => {
  const [ busca, setBusca ] = useState<string>('')
  const { data } = useQuery<AlunosQueryData>(ALUNOS_QUERY, { variables: { busca } })
  const [ removerAluno ] = useMutation(REMOVER_ALUNO_MUTATION, {
    refetchQueries: [ALUNOS_QUERY, 'GetAlunos']
  })

  const onBuscaInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setBusca(value)
  }

  const onDeleteClick = (aluno: Aluno) => {
    removerAluno({ variables: { id: aluno.id } })
  }

  return (
    <section className="aluno">
      <h4 className="aluno__title">Listagem de Alunos</h4>

      <input 
        type="text" 
        name="busca" 
        placeholder="Pesquise por nome, email ou cpf"
        className="input__pesquisa"
        onChange={onBuscaInputChange} />

      <table className="aluno__table">
        <thead>
          <tr>
            <th className="aluno__table__id">ID</th>
            <th className="aluno__table__nome">Nome</th>
            <th className="aluno__table__email">Email</th>
            <th className="aluno__table__cpf">CPF</th>
            <th className="aluno__table__acoes">Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            data && data.alunos.map((aluno: Aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
                <td>{aluno.cpf}</td>
                <td className="cell-action">
                  <button className="btn-action">
                    <FaTimes color="white" onClick={() => onDeleteClick(aluno)} />
                  </button>
                  <button className="btn-action">
                    <FaEdit color="white" onClick={() => console.log('editando')} />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  )
}