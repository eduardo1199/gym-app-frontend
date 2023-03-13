import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Home } from '../../../pages/Home'

jest.mock('react-router-dom', () => {
  return {
    useNavigate() {
      return {}
    },
  }
})

describe('Test Component Home Page Form', () => {
  it('should be render title form and select profile buttons and Inputs', () => {
    const { getByTestId, getByTitle, getByLabelText, queryByLabelText } =
      render(<Home />)

    expect(getByTestId('home-form-title')).toBeInTheDocument()
    expect(getByTitle('aluno')).toBeInTheDocument()
    expect(getByTitle('gerente')).toBeInTheDocument()
    expect(getByLabelText('Informe seu CPF')).toBeInTheDocument()
    expect(queryByLabelText('Informe sua senha')).toBeNull()
  })

  it('should be render input password after select profile admin', async () => {
    const { getByTitle, getByLabelText, queryByLabelText } = render(<Home />)

    expect(getByTitle('gerente')).toBeInTheDocument()

    const buttonSelectProfileAdmin = getByTitle('gerente')

    await userEvent.click(buttonSelectProfileAdmin)

    expect(getByLabelText('Informe seu CPF')).toBeInTheDocument()
    expect(queryByLabelText('Informe sua senha')).toBeInTheDocument()
  })

  it('should be not render input password after select profile student', async () => {
    const { getByTitle, getByLabelText, queryByLabelText } = render(<Home />)

    expect(getByTitle('gerente')).toBeInTheDocument()
    expect(getByTitle('aluno')).toBeInTheDocument()

    const buttonSelectProfileAdmin = getByTitle('gerente')
    const buttonSelectProfileStudent = getByTitle('aluno')

    await userEvent.click(buttonSelectProfileAdmin)
    await userEvent.click(buttonSelectProfileStudent)

    expect(getByLabelText('Informe seu CPF')).toBeInTheDocument()
    expect(queryByLabelText('Informe sua senha')).toBeNull()
  })

  it('should be login is required values cpf and password', async () => {
    const { findByTestId, getByText } = render(<Home />)

    expect(await findByTestId('button-submit')).toBeInTheDocument()

    const buttonOnSubmit = await findByTestId('button-submit')

    await userEvent.click(buttonOnSubmit)

    expect(getByText('Obrigatório')).toBeInTheDocument()
  })

  it('should be login is required cpf with student profile', async () => {
    const { findByTestId, getByText, getByTitle } = render(<Home />)

    const buttonSelectProfileStudent = getByTitle('aluno')

    await userEvent.click(buttonSelectProfileStudent)

    expect(await findByTestId('button-submit')).toBeInTheDocument()

    const buttonOnSubmit = await findByTestId('button-submit')

    await userEvent.click(buttonOnSubmit)

    expect(getByText('Obrigatório')).toBeInTheDocument()
  })

  it('should be login student profile', async () => {
    const { findByTestId, getByTitle, getByPlaceholderText } = render(<Home />)

    const buttonSelectProfileStudent = getByTitle('aluno')

    await userEvent.click(buttonSelectProfileStudent)

    const inputCPF = getByPlaceholderText('insira seu CPF (somente números)')
    await userEvent.type(inputCPF, '956.775.141-28')

    expect(await findByTestId('button-submit')).toBeInTheDocument()

    const buttonOnSubmit = await findByTestId('button-submit')

    await userEvent.click(buttonOnSubmit)
  })

  it('should be value input cpf is invalid', async () => {
    const { findByTestId, getByTitle, getByPlaceholderText, getByText } =
      render(<Home />)

    const buttonSelectProfileStudent = getByTitle('aluno')

    await userEvent.click(buttonSelectProfileStudent)

    const inputCPF = getByPlaceholderText('insira seu CPF (somente números)')
    await userEvent.type(inputCPF, '95677514128')

    expect(await findByTestId('button-submit')).toBeInTheDocument()

    const buttonOnSubmit = await findByTestId('button-submit')

    await userEvent.click(buttonOnSubmit)

    expect(getByText('CPF inválido')).toBeInTheDocument()
  })

  it('should be login admin profile', async () => {
    const { findByTestId, getByTitle, getByPlaceholderText } = render(<Home />)

    const buttonSelectProfileAdmin = getByTitle('gerente')
    await userEvent.click(buttonSelectProfileAdmin)

    const inputCPF = getByPlaceholderText('insira seu CPF (somente números)')
    await userEvent.type(inputCPF, '116.459.944-57')

    const passwordInput = getByPlaceholderText('digite sua senha')
    await userEvent.type(passwordInput, '123456')

    expect(await findByTestId('button-submit')).toBeInTheDocument()
    const buttonOnSubmit = await findByTestId('button-submit')

    await userEvent.click(buttonOnSubmit)
  })
})
