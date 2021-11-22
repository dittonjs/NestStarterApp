import { useContext } from 'react';
import { SettingsContext } from '../../utils/settings_context';

export const Home = () => {
  const [, dispatch] = useContext(SettingsContext);
  const logout = async () => {
    const res = await fetch('/sessions', {
      method: 'DELETE',
    });
    if (res.status === 200) {
      dispatch({ type: 'update', payload: { jwt: undefined } });
    }
  };

  return (
    <div>
      <h1>Welcome</h1>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};
