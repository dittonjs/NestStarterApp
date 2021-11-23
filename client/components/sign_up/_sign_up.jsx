import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../utils/auth_context';
import { Paper } from '../common/paper';
import { Input } from '../common/input';
import { Button } from '../common/button';

export const SignUp = () => {
  const [, setAuthToken] = useContext(AuthContext);
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
      setAuthToken(result.token);
      navigate('/');
    }
  };

  return (
    <div className="flex flex-row justify-center m-4">
      <div className="w-96">
        <Paper>
          <div>Name</div>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <div>Email</div>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div>Confirm Email</div>
          <Input type="email" value={emailConfirmation} onChange={(e) => setEmailConfirmation(e.target.value)} />
          <div>Password</div>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div>Confirm Password</div>
          <Input
            type="password"
            value={passwordConfiramation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <div className="flex flex-row justify-end mt-2">
            <Button type="button" onClick={signUp}>
              Sign up
            </Button>
          </div>
          <div className="flex">{errorMessage}</div>
        </Paper>
      </div>
    </div>
  );
};
