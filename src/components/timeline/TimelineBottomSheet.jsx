import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { BottomSheet } from 'react-spring-bottom-sheet';
import EventDetails from './EventDetails';

const TimelineBottomSheet = ({ open, onDismiss, item }) => {
  const initialFocusRef = useRef(null);
  return (
    <BottomSheet
      open={open}
      onDismiss={onDismiss}
      initialFocusRef={initialFocusRef}
      snapPoints={({ minHeight, maxHeight }) =>
        Math.min(minHeight, maxHeight - maxHeight / 10)
      }
      header={
        <div className="event-details-date-container">
          <div className="event-details-date">{item.content.date}</div>
        </div>
      }
      className="nunito-font"
      onSpringCancel={async (event) => {
        // Edge case when user opens the bottom sheet again before the close animation finishes
        if (event.type === 'CLOSE') {
          const scrollBody = document.querySelector('div[data-rsbs-scroll]');
          // We have to manually set the scrollbar position back to the top in this case
          if (scrollBody) {
            scrollBody.scrollTop = 0 - scrollBody.scrollHeight;
          }
        }
      }}
    >
      <EventDetails
        ref={initialFocusRef}
        content={item.content}
        hideTitle={false}
        title={item.content.title}
        description={item.content.content}
        references={item.content.learnMore}
        hideDate
      />
    </BottomSheet>
  );
};

TimelineBottomSheet.propTypes = {
  open: PropTypes.bool,
  onDismiss: PropTypes.func,
  item: PropTypes.shape({
    content: PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string,
      content: PropTypes.string,
      learnMore: PropTypes.string,
    }),
  }),
};

TimelineBottomSheet.defaultProps = {
  open: false,
  onDismiss: () => {},
  item: {
    content: {
      date: '',
    },
  },
};

export default TimelineBottomSheet;
