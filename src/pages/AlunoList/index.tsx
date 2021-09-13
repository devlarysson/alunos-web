import React, { ChangeEvent, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

import { useHistory } from 'react-router-dom';
import { FaPen, FaTimes } from 'react-icons/fa';

import { Button, Table, Spinner, Card, Form } from 'react-bootstrap';

import { Aluno } from '../../entities/Aluno';

import './styles.css';

interface AlunosQueryData {
  alunos: Aluno[];
}

const ALUNOS_QUERY = gql`
  query GetAlunos($busca: String) {
    alunos(busca: $busca) {
      id
      nome
      email
      cpf
    }
  }
`;

const REMOVER_ALUNO_MUTATION = gql`
  mutation RemoverAluno($id: Int!) {
    removerAluno(id: $id) {
      nome
      email
      cpf
    }
  }
`;

export const AlunoList = () => {
  const [busca, setBusca] = useState<string>('');

  const { data } = useQuery<AlunosQueryData>(ALUNOS_QUERY, { variables: { busca } });
  const [removerAluno, { loading: isDeleting }] = useMutation(REMOVER_ALUNO_MUTATION, {
    refetchQueries: [ALUNOS_QUERY, 'GetAlunos'],
  });

  let history = useHistory();

  const redirectForm = (id?: number) => {
    const path = id ? `/form/${id}` : '/form';
    history.push(path);
  };

  const onBuscaInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setBusca(value);
  };

  const onDeleteClick = (aluno: Aluno) => {
    removerAluno({ variables: { id: aluno.id } });
  };

  const onEditClick = (aluno: Aluno) => {
    redirectForm(aluno.id);
  };

  const onAddClick = () => {
    redirectForm();
  };

  return (
    <Card className="aluno__list">
      <Card.Header className="w-100 d-flex flex-row align-items-baseline justify-content-between">
        <Card.Title>Listagem de Alunos</Card.Title>
        <Button variant="primary" size="sm" onClick={onAddClick}>
          Novo Aluno
        </Button>
      </Card.Header>
      <Card.Header className="w-100">
        <Form.Control
          id="busca"
          name="busca"
          type="text"
          placeholder="Pesquise por nome, email ou cpf"
          className="text-center form-control"
          onChange={onBuscaInputChange}
        />
      </Card.Header>
      <Card.Body className="aluno__table__container">
        <Table bordered striped hover>
          <thead>
            <tr>
              <th className="w-10">ID</th>
              <th className="w-35">Nome</th>
              <th className="w-30">Email</th>
              <th className="w-15">CPF</th>
              <th className="w-10">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.alunos.map((aluno: Aluno) => (
                <tr key={aluno.id} className="align-middle">
                  <td>{aluno.id}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.email}</td>
                  <td>{aluno.cpf}</td>
                  <td className="d-flex justify-content-evenly">
                    <Button variant="danger" size="sm" disabled={isDeleting} onClick={() => onDeleteClick(aluno)}>
                      {isDeleting ? (
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                      ) : (
                        <FaTimes color="white" />
                      )}
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => onEditClick(aluno)}>
                      <FaPen color="white" />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
