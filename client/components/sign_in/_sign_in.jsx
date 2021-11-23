import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../utils/auth_context';
import { Paper } from '../common/paper';
import { Input } from '../common/input';
import { Button } from '../common/button';

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
    <div className="flex flex-row justify-center m-4">
      <div className="w-96">
        <Paper>
          <div>Email</div>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div>Password</div>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="flex flex-row justify-end mt-2">
            <Button type="button" onClick={goToSignUp}>
              Sign up
            </Button>
            <div className="pl-2" />
            <Button type="button" onClick={signIn}>
              Sign in
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};
