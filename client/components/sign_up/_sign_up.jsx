import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { SettingsContext } from '../../utils/settings_context';

export const SignUp = () => {
  const [, dispatch] = useContext(SettingsContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfiramation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const signUp = async () => {
    if (email === '') {
      setErrorMessage('Email cannot be blank');
      return;
    }
    if (email !== emailConfirmation) {
      setErrorMessage('Email does not match.');
      return;
    }
    if (password === '') {
      setErrorMessage('Password cannot be blank');
      return;
    }
    if (password !== passwordConfiramation) {
      setErrorMessage('Password does not match');
      return;
    }
    if (name === '') {
      setErrorMessage('Name cannot be blank.');
      return;
    }
    const res = await fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    if (res.status === 201) {
      const result = await res.json();
      dispatch({ type: 'update', payload: { jwt: result.token } });
      navigate('/');
    }
  };

  return (
    <div>
      <div>Name</div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>Email</div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>Confirm Email</div>
      <input
        type="email"
        value={emailConfirmation}
        onChange={(e) => setEmailConfirmation(e.target.value)}
      />
      <div>Password</div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>Confirm Password</div>
      <input
        type="password"
        value={passwordConfiramation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <div>
        <button type="button" onClick={signUp}>Sign up</button>
      </div>
    </div>
  );
};
