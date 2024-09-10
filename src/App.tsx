import { Footer } from 'components';
import { Timer } from 'features/timer';

import './App.css';

const App = () => {
  Notification.requestPermission((result) => {
    console.log(result);
  });

  return (
    <div className="app">
      <Timer />
      <Footer />
    </div>
  );
};

export default App;
