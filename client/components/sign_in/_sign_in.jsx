import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { SettingsContext } from '../../utils/settings_context';

export const SignIn = () => {
  const [, dispatch] = useContext(SettingsContext);
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
      dispatch({ type: 'update', payload: { jwt: result.token } });
      navigate('/');
    } else {
      console.error('An issue occurred when logging in.');
    }
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
        <button type="button" onClick={signIn}>
          Sign in
        </button>
      </div>
      <div>
        <button type="button" onClick={goToSignUp}>
          Sign up
        </button>
      </div>
    </div>
  );
};
