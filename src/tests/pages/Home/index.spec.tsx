import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Home } from '../../../pages/Home'

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
})
