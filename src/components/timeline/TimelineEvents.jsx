import React from 'react';
import PropTypes from 'prop-types';
import './TimelineEvents.css';
import ScrollAnimContainer from '../scroll-anim-container/ScrollAnimContainer';
import ScrollAnimItem from '../scroll-anim-container/ScrollAnimItem';
import EventDetails from './EventDetails';

const TimelineEvents = ({ currObjIdx, timelineObjs, onChange }) => {
  return (
    <div className="timeline-events-container">
      {timelineObjs.length > 0 && (
        <ScrollAnimContainer showChildIdx={currObjIdx} onChange={onChange}>
          {timelineObjs.map((obj) => (
            <ScrollAnimItem
              key={obj.content.title}
              content={
                <EventDetails
                  date={obj.content.date}
                  description={obj.content.content}
                  title={obj.content.title}
                  references={obj.content.learnMore}
                />
              }
            />
          ))}
        </ScrollAnimContainer>
      )}
    </div>
  );
};

TimelineEvents.propTypes = {
  controllers: PropTypes.shape({
    moveNext: PropTypes.func,
  }),
  currObjIdx: PropTypes.number, // idx of currently selected obj
  onChange: PropTypes.func, // callback function
  timelineObjs: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        content: PropTypes.string,
        learnMore: PropTypes.string,
      }),
    })
  ),
};

TimelineEvents.defaultProps = {
  controllers: {},
  currObjIdx: 0,
  onChange: PropTypes.func,
  timelineObjs: [],
};

export default TimelineEvents;
