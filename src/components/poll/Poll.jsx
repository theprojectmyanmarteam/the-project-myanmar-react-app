import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Poll.css';
import Button from 'react-bootstrap/Button';

const Poll = ({ pollID }) => {
  // SampleData for test purposes. For dynamic purpose, use pollID to fetch from db
  const sampleData = {
    title: 'What was your intial reaction to the coup?',
    options: ['Upset', 'Neutral', 'Triggered', 'Indifferent'],
    optionsVotes: [0.4, 0.2, 0.3, 0.1],
  };

  const [selected, setSelected] = useState(null);
  const [detailsShown, toggleDetails] = useState(false);

  const buttonClicked = (option) => {
    setSelected(option);
    toggleDetails(true);
  };

  return (
    <div className="poll-container">
      <div className="poll-title">
        <h1>{sampleData.title}</h1>
      </div>
      <div className="poll-options-container">
        <Button className="poll-button" onClick={buttonClicked(0)} />
        <Button className="poll-button" onClick={buttonClicked(1)} />
        <Button className="poll-button" onClick={buttonClicked(2)} />
        <Button className="poll-button" onClick={buttonClicked(3)} />
      </div>
    </div>
  );
};

Poll.propTypes = {
  pollID: PropTypes.string,
};

Poll.defaultProps = {
  pollID: '',
};

export default Poll;
