import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AppRouter from './AppRouter';

const App = () => {
  // run at the start of every app
  useEffect(() => {
    const navigation = window.performance.getEntriesByType('navigation')[0];
    if (
      navigation.type !== 'reload' ||
      !sessionStorage.getItem('sessionStartTime')
    ) {
      sessionStorage.setItem('sessionStartTime', new Date());
    }
  }, []);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};

export default App;
