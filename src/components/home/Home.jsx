import React from 'react';

import Title from '../Title';
import Mingalarbar from '../mingalarbar/Mingalarbar';
import Quiz from '../quiz/Quiz';
import ScrollAnimContainer from '../scroll-anim-container/ScrollAnimContainer';
import ScrollAnimItem from '../scroll-anim-container/ScrollAnimItem';
import Directory from '../directory/Directory';

const Home = () => {
  return (
    <div className="App">
      <ScrollAnimContainer>
        <ScrollAnimItem
          content={<Title />}
          nextButton={{
            show: false,
            label: 'Press down to start',
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
