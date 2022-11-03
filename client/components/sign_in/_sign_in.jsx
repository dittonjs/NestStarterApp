import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../utils/auth_context';

export const SignIn = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/signup');
  };

  const signIn = async () => {
    const res = await fetch('/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (res.status === 201) {
      const result = await res.json();
      setAuthToken(result.token);
      navigate('/');
    } else {
      console.error('An issue occurred when logging in.');
    }
  };

  return (
    <div>
      <div>Email</div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <div>Password</div>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div>
        <button className="button" type="button" onClick={goToSignUp}>
          Sign up
        </button>
        <button className="button" type="button" onClick={signIn}>
          Sign in
        </button>
      </div>
    </div>
  );
};
