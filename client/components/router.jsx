import { Routes, Route } from 'react-router-dom';
import { Home } from './home/_home';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
