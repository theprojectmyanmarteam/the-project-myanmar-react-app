import React, { useState } from 'react';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import Button from 'react-bootstrap/Button';
import { BsChevronCompactDown } from 'react-icons/bs';

import './Title.css';

const START_TYPING_DELAY_MS = 1500;
const SHOW_BUTTON_DELAY_MS = 1000;

const Title = () => {
  const [showDown, setShowDown] = useState(false);

  const onTypingDone = () => {
    setTimeout(() => {
      setShowDown(true);
    }, SHOW_BUTTON_DELAY_MS);
  };

  return (
    <div id="title-container">
      <Typist
        startDelay={START_TYPING_DELAY_MS}
        className="title"
        onTypingDone={onTypingDone}
      >
        The Project Myanmar
      </Typist>
      {showDown && (
        <div id="down-div" className="fade-in">
          <p id="down-text">Swipe down to start</p>
          <Button variant="dark" id="down-button">
            <BsChevronCompactDown size="2em" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Title;
