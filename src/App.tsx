import { Footer } from 'components';
import { Timer, setSettings } from 'features/timer';
import { useAppDispatch } from 'hooks';

import './App.css';

const App = () => {
  const dispatch = useAppDispatch();

  const localStorageSettings = localStorage.getItem('settings');
  if (localStorageSettings !== null) {
    const settings = JSON.parse(localStorageSettings);
    dispatch(setSettings(settings));
  }

  return (
    <div className="app">
      <Timer />
      <Footer />
    </div>
  );
};

export default App;
