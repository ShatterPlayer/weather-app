import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Notification from '@/app/_components/Notification/Notification'

describe('Notification', () => {
  it('renders message', () => {
    render(<Notification dismissTime={1000} message="Test message" />)

    expect(screen.getByText('Test message')).toBeInTheDocument()
  })
})
