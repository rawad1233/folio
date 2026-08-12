import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormField } from '../../components/ui/FormField/FormField';
import { useAuth } from '../../features/auth/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (email.trim() === '' || password === '') {
      setError('Please enter your email and password.');
      return;
    }

    setSubmitting(true);
    const { error: signInError } = await signIn(email.trim(), password);
    setSubmitting(false);

    if (signInError) {
      setError(signInError);
      return;
    }
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <div className="auth-logo-dot" />
          </div>
          <span className="auth-logo-text">Folio</span>
        </div>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Log in to see your expenses and budgets.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <FormField
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={setEmail}
          />
          <FormField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
          />

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-submit" type="submit" disabled={submitting}>
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export { LoginPage };
