import React from 'react';

import './Directory.css';
import DirectoryCard from './DirectoryCard';

const Directory = () => {
  return (
    <div className="directory-container">
      <DirectoryCard name="#history" route="/history" />
      <DirectoryCard name="#groupsinthecoup" route="/groups-in-the-coup" />
      <DirectoryCard name="#coup" route="/coup" />
    </div>
  );
};

export default Directory;
