import { useState } from 'react';
import { useNavigate } from 'react-router';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div>
      <div>Email</div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>Password</div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <button type="button">Sign in</button>
      </div>
      <div>
        <button type="button" onClick={goToSignUp}>
          Sign up
        </button>
      </div>
    </div>
  );
};
