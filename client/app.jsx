import { BrowserRouter } from 'react-router-dom';
import { Router } from './components/router';

export const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};
