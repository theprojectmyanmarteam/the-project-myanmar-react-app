// import React, { useState } from 'react';
import React from 'react';
// import Sound from 'react-sound';

import './Mingalarbar.css';
// import soundFile from '../audio/PotsPans.mp3';

// const Mingalarbar = ({ controllers }) => {
const Mingalarbar = () => {
  //   const [playStatus, setPlayStatus] = useState(Sound.status.PLAYING);
  //   const [soundPosition, setSoundPosition] = useState(0);

  return (
    <div id="mingalarbar-content">
      {/* <Sound
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
      /> */}
      {/* <ReactAudioPlayer src={soundFile} autoPlay loop /> */}
      <p className="h1 title"> Mingalarbar </p>
    </div>
  );
};

export default Mingalarbar;
