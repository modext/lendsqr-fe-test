import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LoginIllustration } from '@/components/LoginIllustration';
import styles from './Login.module.scss';

const LOGO_SVG = (
  <svg className={styles.icon} viewBox="0 0 173 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path
      d="M0 4C0 1.79086 1.79086 0 4 0H16C18.2091 0 20 1.79086 20 4V32C20 34.2091 18.2091 36 16 36H4C1.79086 36 0 34.2091 0 32V4Z"
      fill="#213F7D"
    />
    <path d="M6 10H14V26H6V10Z" fill="white" />
    <path d="M6 10L10 14L14 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <text x="28" y="24" fill="#213F7D" fontFamily="Work Sans, sans-serif" fontSize="24" fontWeight="700">
      lends
    </text>
    <text x="108" y="24" fill="#39CDCC" fontFamily="Work Sans, sans-serif" fontSize="24" fontWeight="700">
      qr
    </text>
  </svg>
);

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/dashboard/users';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password.');
      return;
    }
    const success = login(email, password);
    if (success) {
      navigate('/dashboard/users', { replace: true });
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.logo}>{LOGO_SVG}</div>
        <div className={styles.illustrationWrap}>
          <LoginIllustration />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.formCard}>
          <h1 className={styles.welcome}>Welcome!</h1>
          <p className={styles.subtitle}>Enter details to login.</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                className={styles.input}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                aria-label="Email"
              />
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.passwordWrap}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={styles.passwordInput}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  aria-label="Password"
                />
                <button
                  type="button"
                  className={styles.showToggle}
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>
            <div className={styles.forgotWrap}>
              <a href="/forgot-password" className={styles.forgotLink}>
                FORGOT PASSWORD?
              </a>
            </div>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button type="submit" className={styles.submitBtn}>
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
