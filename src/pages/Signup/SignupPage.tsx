import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormField } from '../../components/ui/FormField/FormField';
import { useAuth } from '../../features/auth/AuthContext';
import '../Login/LoginPage.css';

const SignupPage = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (email.trim() === '' || password === '') {
      setError('Please enter your email and password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    const { error: signUpError } = await signUp(email.trim(), password);
    setSubmitting(false);

    if (signUpError) {
      setError(signUpError);
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

        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Start tracking your expenses and budgets.</p>

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
            placeholder="At least 6 characters"
            value={password}
            onChange={setPassword}
          />
          <FormField
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-submit" type="submit" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Sign up'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export { SignupPage };
