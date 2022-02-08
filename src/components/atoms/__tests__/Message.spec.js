import { render } from '@testing-library/react'

import Message from '../Message'

describe('Message', () => {
  it('should render a title and a message', () => {
    const { getByText } = render(<Message title="Foo">Bar</Message>)

    expect(getByText('Foo')).toBeInTheDocument()
    expect(getByText('Bar')).toBeInTheDocument()
  })
})
