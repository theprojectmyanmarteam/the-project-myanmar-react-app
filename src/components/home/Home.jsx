import React from 'react';

import Title from '../Title';
import Mingalarbar from '../mingalarbar/Mingalarbar';
import Quiz from '../quiz/Quiz';
import ScrollAnimContainer from '../scroll-anim-container/ScrollAnimContainer';
import ScrollAnimItem from '../scroll-anim-container/ScrollAnimItem';
import Directory from '../directory/Directory';
import Map from '../map/Map';

const Home = () => {
  return (
    <div className="App">
      <ScrollAnimContainer>
        <ScrollAnimItem
          content={<Title />}
          nextButton={{
            show: false,
            label: 'Click to start',
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
            label: 'Press down to proceed',
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
          }}
        />
        <ScrollAnimItem
          content={<Directory />}
          prevButton={{
            show: false,
            scrollable: true,
          }}
          nextButton={{
            show: false,
          }}
        />
      </ScrollAnimContainer>
    </div>
  );
};

export default Home;
