import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TimelineEvents.css';
import ScrollAnimContainer from '../scroll-anim-container/ScrollAnimContainer';
import ScrollAnimItem from '../scroll-anim-container/ScrollAnimItem';
import EventDetails from './EventDetails';

const TimelineEvents = ({ currEvent, eventData, onChange }) => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    setDates(eventData.map((event) => event.dates).flat());
  }, [eventData]);

  return (
    <div className="timeline-events-container">
      {dates.length > 0 && (
        <ScrollAnimContainer showChild={currEvent} onChange={onChange}>
          {dates.map((date) => (
            <ScrollAnimItem
              key={date.date}
              name={date.date}
              content={
                <EventDetails
                  date={date.date}
                  description={date.content}
                  title={date.title}
                />
              }
            />
          ))}
        </ScrollAnimContainer>
      )}
      ;
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
