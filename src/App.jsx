import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Title from './components/Title';
import Mingalarbar from './components/mingalarbar/Mingalarbar';
import Quiz from './components/quiz/Quiz';
import HistoryOrCurrent from './components/history-or-current/HistoryOrCurrent';
import ScrollAnimContainer from './components/scroll-anim-container/ScrollAnimContainer';
import ScrollAnimItem from './components/scroll-anim-container/ScrollAnimItem';
import Map from './components/map/Map';

function App() {
  return (
    <div className="App">
      <ScrollAnimContainer>
        <ScrollAnimItem
          content={<Title />}
          nextButton={{
            show: false,
            scrollable: false,
          }}
        />
        <ScrollAnimItem
          content={<Map />}
          prevButton={{
            show: false,
            scrollable: false,
          }}
          nextButton={{
            show: false,
            scrollable: false,
          }}
        />
        <ScrollAnimItem
          content={<Mingalarbar />}
          prevButton={{
            show: false,
            scrollable: true,
          }}
          nextButton={{
            show: true,
            scrollable: true,
          }}
        />
        <ScrollAnimItem
          content={<Quiz />}
          prevButton={{
            show: false,
          }}
          nextButton={{
            show: false,
            scrollable: true,
          }}
        />
        <ScrollAnimItem
          content={<HistoryOrCurrent />}
          prevButton={{
            show: false,
            scrollable: true,
          }}
        />
      </ScrollAnimContainer>
    </div>
  );
}

export default App;
