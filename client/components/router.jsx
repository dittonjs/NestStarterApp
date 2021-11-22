import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './home/_home';
import { SettingsContext } from '../utils/settings_context';
import { SignIn } from './sign_in/_sign_in';
import { SignUp } from './sign_up/_sign_up';

export const Router = () => {
  const [settings] = useContext(SettingsContext);
  const { jwt } = settings;
  return (
    <Routes>
      <Route
        path="/"
        element={jwt ? <Home /> : <Navigate replace to="signin" />} // no jwt means not logged in
      />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
};
