import React from 'react';

import Title from '../Title';
import Mingalarbar from '../mingalarbar/Mingalarbar';
import Quiz from '../quiz/Quiz';
import ScrollAnimContainer from '../scroll-anim-container/ScrollAnimContainer';
import ScrollAnimItem from '../scroll-anim-container/ScrollAnimItem';
import Directory from '../directory/Directory';
import MapWrapper from '../map/MapWrapper';

const Home = () => {
  return (
    <div className="App">
      {!sessionStorage.getItem('appUnlocked') ? (
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
            content={<MapWrapper />}
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
              onClick: () => sessionStorage.setItem('appUnlocked', true),
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
      ) : (
        <Directory />
      )}
    </div>
  );
};

export default Home;
