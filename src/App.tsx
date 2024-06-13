import { Footer } from 'components';
import { Timer } from 'features/timer';

import './App.css';

const App = () => {
  return (
    <div className="app">
      <Timer />
      <Footer />
    </div>
  );
};

export default App;
