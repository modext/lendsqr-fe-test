import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from './AuthContext';

function TestConsumer() {
  const auth = useAuth();
  return (
    <div>
      <span data-testid="auth">{String(auth.isAuthenticated)}</span>
      <button type="button" onClick={() => auth.login('a@b.com', 'pass')}>Login</button>
      <button type="button" onClick={() => auth.logout()}>Logout</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => localStorage.clear());

  it('starts unauthenticated', () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    expect(screen.getByTestId('auth')).toHaveTextContent('false');
  });

  it('login sets authenticated', async () => {
    const user = userEvent.setup();
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    await user.click(screen.getByText('Login'));
    expect(screen.getByTestId('auth')).toHaveTextContent('true');
  });

  it('logout clears state', async () => {
    const user = userEvent.setup();
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    await user.click(screen.getByText('Login'));
    await user.click(screen.getByText('Logout'));
    expect(screen.getByTestId('auth')).toHaveTextContent('false');
  });
});
