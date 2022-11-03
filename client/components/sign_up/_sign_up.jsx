import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../utils/auth_context';
import { ApiContext } from '../../utils/api_context';


export const SignUp = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
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
    if (password !== passwordConfirmation) {
      setErrorMessage('Password does not match');
      return;
    }
    if (firstName === '') {
      setErrorMessage('First name cannot be blank.');
      return;
    }
    if (lastName === '') {
      setErrorMessage('Last name cannot be blank.');
      return;
    }

    const { token } = await api.post('/users', {
      firstName,
      lastName,
      email,
      password,
    });
    setAuthToken(token);
    navigate('/');
  };

  return (
    <div>
      <div>First Name</div>
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <div>Last Name</div>
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <div>Email</div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <div>Confirm Email</div>
      <input type="email" value={emailConfirmation} onChange={(e) => setEmailConfirmation(e.target.value)} />
      <div>Password</div>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div>Confirm Password</div>
      <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
      <div>
        <button type="button" onClick={signUp}>
          Sign up
        </button>
      </div>
      <div>{errorMessage}</div>
    </div>
  );
};
