import React from 'react';
import PropTypes from 'prop-types';
import './TimelineEvents.css';
import ScrollAnimContainer from '../scroll-anim-container/ScrollAnimContainer';
import ScrollAnimItem from '../scroll-anim-container/ScrollAnimItem';
import EventDetails from './EventDetails';

const TimelineEvents = ({
  currItemIdx,
  timelineItems,
  onChange,
  hideTitle,
}) => {
  return (
    <div className="timeline-events-container">
      {timelineItems.length > 0 && (
        <ScrollAnimContainer showChildIdx={currItemIdx} onChange={onChange}>
          {timelineItems.map((item) => (
            <ScrollAnimItem
              key={item.content.title}
              content={
                <EventDetails
                  content={item.content}
                  hideTitle={hideTitle}
                  title={item.content.title}
                  description={item.content.content}
                  references={item.content.learnMore}
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
  currItemIdx: PropTypes.number, // idx of currently selected item
  onChange: PropTypes.func, // callback function
  timelineItems: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        content: PropTypes.string,
        learnMore: PropTypes.string,
      }),
    })
  ),
  hideTitle: PropTypes.bool,
};

TimelineEvents.defaultProps = {
  controllers: {},
  currItemIdx: 0,
  onChange: PropTypes.func,
  timelineItems: [],
  hideTitle: false,
};

export default TimelineEvents;
