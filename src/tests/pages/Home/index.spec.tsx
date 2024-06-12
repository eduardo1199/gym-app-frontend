import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Home } from '../../../pages/Home'

import { describe, expect, it, vi } from 'vitest'
import { Provider } from 'react-redux'

import { store } from '../../../app/store'

vi.mock('react-router-dom', () => {
  return {
    useNavigate() {
      return {}
    },
  }
})

describe('Test Component Home Page Form', () => {
  it.skip('should be render title form and select profile buttons and Inputs', () => {
    const { getByTestId, getByTitle, getByLabelText, queryByLabelText } =
      render(
        <Provider store={store}>
          <Home />
        </Provider>,
      )

    expect(getByTestId('home-form-title')).toBeInTheDocument()
    expect(getByTitle('aluno')).toBeInTheDocument()
    expect(getByTitle('gerente')).toBeInTheDocument()
    expect(getByLabelText('Informe seu CPF')).toBeInTheDocument()
    expect(queryByLabelText('Informe sua senha')).toBeNull()
  })

  it.skip('should be render input password after select profile admin', async () => {
    const { getByTitle, getByLabelText, queryByLabelText } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    )

    expect(getByTitle('gerente')).toBeInTheDocument()

    const buttonSelectProfileAdmin = getByTitle('gerente')

    await userEvent.click(buttonSelectProfileAdmin)

    expect(getByLabelText('Informe seu CPF')).toBeInTheDocument()
    expect(queryByLabelText('Informe sua senha')).toBeInTheDocument()
  })

  it.skip('should be not render input password after select profile student', async () => {
    const { getByTitle, getByLabelText, queryByLabelText } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    )

    expect(getByTitle('gerente')).toBeInTheDocument()
    expect(getByTitle('aluno')).toBeInTheDocument()

    const buttonSelectProfileAdmin = getByTitle('gerente')
    const buttonSelectProfileStudent = getByTitle('aluno')

    await userEvent.click(buttonSelectProfileAdmin)
    await userEvent.click(buttonSelectProfileStudent)

    expect(getByLabelText('Informe seu CPF')).toBeInTheDocument()
    expect(queryByLabelText('Informe sua senha')).toBeNull()
  })

  it.skip('should be login is required values cpf and password', async () => {
    const { findByTestId, getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    )

    expect(await findByTestId('button-submit')).toBeInTheDocument()

    const buttonOnSubmit = await findByTestId('button-submit')

    await userEvent.click(buttonOnSubmit)

    expect(getByText('Obrigatório')).toBeInTheDocument()
  })

  it.skip('should be login is required cpf with student profile', async () => {
    const { findByTestId, getByText, getByTitle } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    )

    const buttonSelectProfileStudent = getByTitle('aluno')

    await userEvent.click(buttonSelectProfileStudent)

    expect(await findByTestId('button-submit')).toBeInTheDocument()

    const buttonOnSubmit = await findByTestId('button-submit')

    await userEvent.click(buttonOnSubmit)

    expect(getByText('Obrigatório')).toBeInTheDocument()
  })

  it.skip('should be login student profile', async () => {
    const { findByTestId, getByTitle, getByPlaceholderText } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    )

    const buttonSelectProfileStudent = getByTitle('aluno')

    await userEvent.click(buttonSelectProfileStudent)

    const inputCPF = getByPlaceholderText('insira seu CPF (somente números)')
    await userEvent.type(inputCPF, '956.775.141-28')

    expect(await findByTestId('button-submit')).toBeInTheDocument()

    const buttonOnSubmit = await findByTestId('button-submit')

    await userEvent.click(buttonOnSubmit)
  })

  it.skip('should be value input cpf is invalid', async () => {
    const { findByTestId, getByTitle, getByPlaceholderText, getByText } =
      render(
        <Provider store={store}>
          <Home />
        </Provider>,
      )

    const buttonSelectProfileStudent = getByTitle('aluno')

    await userEvent.click(buttonSelectProfileStudent)

    const inputCPF = getByPlaceholderText('insira seu CPF (somente números)')
    await userEvent.type(inputCPF, '95677514128')

    expect(await findByTestId('button-submit')).toBeInTheDocument()

    const buttonOnSubmit = await findByTestId('button-submit')

    await userEvent.click(buttonOnSubmit)

    expect(getByText('CPF inválido')).toBeInTheDocument()
  })

  it.skip('should be login admin profile', async () => {
    const { findByTestId, getByTitle, getByPlaceholderText } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    )

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
