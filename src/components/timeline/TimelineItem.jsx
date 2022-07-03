import React from 'react';
import PropTypes from 'prop-types';
import './TimelineItem.css';

import Button from 'react-bootstrap/Button';

const TimelineItem = React.forwardRef(
  ({ item, id, onClick, autoFocus, onlyDates }, ref) => {
    return (
      <Button
        key={item.content.title}
        ref={ref}
        className="timeline-item"
        style={{ top: item.yPos }}
        onClick={onClick}
        autoFocus={autoFocus}
      >
        <div>
          <svg
            width="100"
            height="50"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <g>
              <circle
                className="timeline-item-circle"
                cx="50"
                cy="43"
                r="30"
                stroke="white"
                strokeWidth="5"
                fill="none"
                id={id}
              />
            </g>
          </svg>
        </div>
        <div className="timeline-item-text">
          {onlyDates
            ? `${item.content.date}`
            : `${item.content.date} - ${item.content.title}`}
        </div>
      </Button>
    );
  }
);

TimelineItem.propTypes = {
  item: PropTypes.shape({
    content: PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string.isRequired,
    }),
    yPos: PropTypes.number.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  autoFocus: PropTypes.bool,
  onlyDates: PropTypes.bool,
};

TimelineItem.defaultProps = {
  onClick: () => {},
  autoFocus: false,
  onlyDates: false,
};

export default TimelineItem;
