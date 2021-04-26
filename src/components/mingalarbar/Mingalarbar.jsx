import React, { useState, useEffect } from 'react';
// import React from 'react';
import Sound from 'react-sound';
import PropTypes from 'prop-types';

import './Mingalarbar.css';
import soundFile from '../../audio/PotsPans.mp3';

const Mingalarbar = ({ shown }) => {
  const [playStatus, setPlayStatus] = useState(Sound.status.PAUSED); // Initially pause the audio
  const [soundPosition] = useState(0); // start playing audo from the start (postion 0)

  useEffect(() => {
    if (shown) {
      setPlayStatus(Sound.status.PLAYING); // only play the audio if the user is on Mingalarbar page
    } else {
      setPlayStatus(Sound.status.STOPPED); // stops playing the audio if the user move to previou or next page
    }
  }, [shown]);

  return (
    <div id="mingalarbar-content">
      <Sound
        url={soundFile} // specify the audio source
        playStatus={playStatus} // {PLAYING, STOPPED, PAUSED}
        playFromPosition={soundPosition} // specify which position to start playing from
        loop // play audio in loop
        volume={100}
      />
      {/* <ReactAudioPlayer src={soundFile} autoPlay loop /> */}
      <p className="h1 title"> Mingalarbar </p>
    </div>
  );
};

Mingalarbar.propTypes = {
  shown: PropTypes.bool,
};

Mingalarbar.defaultProps = {
  shown: true,
};

export default Mingalarbar;
