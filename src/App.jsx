import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Title from './components/Title';
import Quiz from './components/quiz/Quiz';
import Timeline from './components/Timeline';
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
          }}
        />
        <ScrollAnimItem
          content={<Quiz />}
          prevButton={{
            show: false,
          }}
          nextButton={{
            show: false,
          }}
        />
        <ScrollAnimItem
          content={<Timeline />}
          prevButton={{
            show: false,
          }}
        />
      </ScrollAnimContainer>
    </div>
  );
}

export default App;
