import { useReducer } from 'react';
import { HashRouter } from 'react-router-dom';
import { Router } from './components/router';
import { SettingsContext } from './utils/settings_context';

const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'update': {
      return { ...state, ...action.payload };
    }
  }
  return state;
};

export const App = () => {
  const [settings, dispatch] = useReducer(settingsReducer, window.SETTINGS);

  return (
    <SettingsContext.Provider value={[settings, dispatch]}>
      <HashRouter>
        <Router />
      </HashRouter>
    </SettingsContext.Provider>
  );
};
