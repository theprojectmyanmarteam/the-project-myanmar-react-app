import React, { useState, useEffect } from 'react';
// import React from 'react';
import Sound from 'react-sound';
import PropTypes from 'prop-types';

import './Mingalarbar.css';
import soundFile from '../../audio/PotsPans.mp3';

const Mingalarbar = ({ shown }) => {
  // const Mingalarbar = () => {
  const [playStatus, setPlayStatus] = useState(Sound.status.PAUSED);
  const [soundPosition, setSoundPosition] = useState(0);

  useEffect(() => {
    if (shown) {
      setPlayStatus(Sound.status.PLAYING);
    } else {
      setPlayStatus(Sound.status.STOPPED);
    }
  }, [shown]);

  return (
    <div id="mingalarbar-content">
      <Sound
        url={soundFile}
        playStatus={playStatus}
        playFromPosition={soundPosition}
        onLoading={() => {
          setSoundPosition(soundPosition);
        }}
        onPlaying={() => {
          setSoundPosition(soundPosition);
        }}
        onFinishedPlaying={() => {
          setPlayStatus(Sound.status.STOPPED);
        }}
        loop
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
