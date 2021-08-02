import React from 'react';
import Button from 'react-bootstrap/Button';

import './HistoryOrCurrent.css';

const HistoryOrCurrent = () => {
  return (
    <div className="history-or-current-container">
      <div className="history-or-current-text h4">
        <p>What would you like to learn about Myanmar?</p>
      </div>
      <div className="history-or-current-choice">
        <Button
          variant="outline-light"
          className="history-or-current-btn"
          onClick={() => {}}
        >
          History
        </Button>
        <Button
          variant="outline-light"
          className="history-or-current-btn"
          onClick={() => {}}
        >
          Current Events
        </Button>
      </div>
    </div>
  );
};

export default HistoryOrCurrent;
