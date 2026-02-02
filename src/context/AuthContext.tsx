import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

const AUTH_KEY = 'lendsqr_auth';

interface AuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const defaultState: AuthState = {
  isAuthenticated: false,
  userEmail: null,
};

function loadStoredAuth(): AuthState {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) {
      const { email } = JSON.parse(raw) as { email: string };
      return { isAuthenticated: true, userEmail: email };
    }
  } catch {
    // ignore
  }
  return defaultState;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(loadStoredAuth);

  const login = useCallback((email: string, password: string): boolean => {
    if (!email.trim() || !password.trim()) return false;
    setState({ isAuthenticated: true, userEmail: email.trim() });
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email: email.trim() }));
    return true;
  }, []);

  const logout = useCallback(() => {
    setState(defaultState);
    localStorage.removeItem(AUTH_KEY);
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
