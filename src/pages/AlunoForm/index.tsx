import { ChangeEvent, useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import gql from "graphql-tag"
import { Button, Card, Form, Spinner } from "react-bootstrap"
import { useHistory, useParams } from "react-router"

interface AlunoFormState {
  nome: string
  email: string
  cpf: string
}

interface AlunoFormParams {
  id?: string
}

const ALUNO_QUERY = gql`
  query GetAluno($id: Int!) {
    aluno(id: $id) {
      id,
      nome,
      email,
      cpf
    }
  }
`

const SALVAR_ALUNO_MUTATION = gql`
  mutation SalvarAluno($id: Int, $nome: String!, $email: String!, $cpf: String!) {
    salvarAluno(alunoDados: {
      id: $id,
      nome: $nome,
      email: $email,
      cpf: $cpf
    }) {
      id,
      nome,
      email,
      cpf
    }
  }
`

export const AlunoForm = () => {
  let history = useHistory()
  let { id } = useParams<AlunoFormParams>()

  const { data } = useQuery(ALUNO_QUERY, { variables: { id: id ? Number(id) : null } })
  const [ salvarAluno, { loading: isSaving } ] = useMutation(SALVAR_ALUNO_MUTATION)

  const [formState, setFormState] = useState<AlunoFormState>({
    nome: '',
    email: '',
    cpf: '',
  })

  const redirectList = () => {
    history.push('/')
  }

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormState({ ...formState, [name]: value })
  }

  const onSaveClick = async () => {
    const { data: { salvarAluno: alunoSalvo } } = await salvarAluno({ variables: formState })
    redirectList()
  }

  useEffect(() => {
    setFormState({
      ...data?.aluno
    })
  }, [data])

  return (
    <Card>
      <Card.Header>
        <Card.Title>Formulário</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group controlId="nome" className="m-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" name="nome" placeholder="Informe o nome" onChange={onInputChange} value={formState.nome} />
          </Form.Group>

          <Form.Group controlId="email" className="m-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="Informe o email" onChange={onInputChange} value={formState.email}  />
          </Form.Group>

          <Form.Group controlId="CPF" className="m-3">
            <Form.Label>CPF</Form.Label>
            <Form.Control type="text" maxLength={11} name="cpf" placeholder="Informe o CPF" onChange={onInputChange} value={formState.cpf}  />
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-around">
        <Button variant="primary" onClick={onSaveClick}>
        { isSaving ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          ) : ( 
          <span>Salvar</span>
        )}
        </Button>
        <Button variant="secondary" onClick={redirectList}>Voltar</Button>
      </Card.Footer>
    </Card>
  )
}