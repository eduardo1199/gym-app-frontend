import { render, screen } from '@testing-library/react'
import { Home } from '../../../pages/Home'

it('should be text in the home', () => {
  const { getByTestId } = render(<Home />)
  expect(getByTestId('home-form-title')).toBeInTheDocument()
})
