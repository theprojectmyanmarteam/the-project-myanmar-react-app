import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Title from './components/Title';
import Quiz from './components/Quiz';
import ScrollAnimContainer from './components/scroll-anim-container/ScrollAnimContainer';

function App() {
  return (
    <div className="App">
      <ScrollAnimContainer>
        <Title />
        <Quiz />
      </ScrollAnimContainer>
    </div>
  );
}

export default App;
