import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TimelineEvents.css';
import ScrollAnimContainer from '../scroll-anim-container/ScrollAnimContainer';
import ScrollAnimItem from '../scroll-anim-container/ScrollAnimItem';
import EventDetails from './EventDetails';

const TimelineEvents = ({ currEvent, eventData, onChange }) => {
  const [dates] = useState(eventData.map((event) => event.dates).flat());

  return (
    <div className="timeline-events-container">
      <ScrollAnimContainer showChild={currEvent} onChange={onChange}>
        {dates.map((date) => (
          <ScrollAnimItem name={date} content={<EventDetails date={date} />} />
        ))}
      </ScrollAnimContainer>
    </div>
  );
};

TimelineEvents.propTypes = {
  controllers: PropTypes.shape({
    moveNext: PropTypes.func,
  }),
  currEvent: PropTypes.string, // name of currently selected event
  onChange: PropTypes.func, // callback function
  eventData: PropTypes.arrayOf(PropTypes.object),
};

TimelineEvents.defaultProps = {
  controllers: {},
  currEvent: '',
  onChange: PropTypes.func,
  eventData: [],
};

export default TimelineEvents;
