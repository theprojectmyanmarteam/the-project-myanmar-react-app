import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Title from './components/Title';
import Mingalarbar from './components/mingalarbar/Mingalarbar';
import Quiz from './components/quiz/Quiz';
import ScrollAnimContainer from './components/scroll-anim-container/ScrollAnimContainer';
import ScrollAnimItem from './components/scroll-anim-container/ScrollAnimItem';

function App() {
  return (
    <div className="App">
      <ScrollAnimContainer>
        <ScrollAnimItem
          content={<Title />}
          nextButton={{
            show: false,
            label: 'Scroll down to start',
            scrollable: true,
          }}
        />
        <ScrollAnimItem
          content={<Mingalarbar />}
          nextButton={{
            show: false,
            scrollable: true,
          }}
          prevButton={{
            show: false,
            scrollable: true,
          }}
        />
        <ScrollAnimItem
          content={<Quiz />}
          prevButton={{
            show: false,
          }}
        />
      </ScrollAnimContainer>
    </div>
  );
}

export default App;
