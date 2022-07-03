import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Timeline.css';

import Xarrow from 'react-xarrows';
import Helmet from 'react-helmet';
import { useMediaQuery } from 'react-responsive';
import TimelineEvents from './TimelineEvents';
import LoadingSpinner from '../LoadingSpinner';
import TimelineItem from './TimelineItem';

import { getHistoryData, getCoupData } from '../../js/fetchData';
import { extractTimeline } from '../../js/dataHelper';
import Layout from '../layout/Layout';
import TimelineBottomSheet from './TimelineBottomSheet';

const Timeline = ({ type }) => {
  const [currItemIdx, setCurrItemIdx] = useState(0);
  const [timelineItems, setTimelineItems] = useState([]);
  const [timelineHeight, setTimelineHeight] = useState(0);
  /* Mobile */
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const timelineContainerRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const timelineOffsetRef = useRef(0);
  const prevItemDateRef = useRef('');

  const isDesktop = useMediaQuery({ minWidth: 769 });

  const getDiffInDays = (date1, date2) => {
    return (date1.getTime() - date2.getTime()) / (1000 * 3600 * 24);
  };

  const calculateYCoords = (timelineObj, firstEvent) => {
    if (timelineObj.type === 'EVENT') {
      const currEvent = timelineObj.content;
      // global bookkeeping
      if (currEvent.date === prevItemDateRef.current) {
        timelineOffsetRef.current += 1;
      }
      prevItemDateRef.current = currEvent.date;

      const dateDiff =
        type === 'HISTORY'
          ? parseInt(currEvent.date, 10) - parseInt(firstEvent.date, 10) // difference in years
          : getDiffInDays(new Date(currEvent.date), new Date(firstEvent.date)); // difference in days

      const yCoords = 200 + (dateDiff + timelineOffsetRef.current) * 70;
      return yCoords;
    }
    return 0;
  };

  useEffect(() => {
    const getData = type === 'HISTORY' ? getHistoryData : getCoupData;
    getData().then((data) => {
      const timelineObjs = extractTimeline(data);
      const firstEventObj = timelineObjs.find((obj) => obj.type === 'EVENT');

      // for now  filter out just the event types
      // calculate the yPos of the items
      const processedTimelineObjs = timelineObjs
        .filter((obj) => obj.type === 'EVENT')
        .map((obj) => ({
          ...obj,
          yPos: calculateYCoords(obj, firstEventObj.content),
        }));

      if (processedTimelineObjs.length > 0) {
        const lastItemYPos =
          processedTimelineObjs[processedTimelineObjs.length - 1].yPos;
        setTimelineHeight(lastItemYPos + 700);
      }
      setTimelineItems(processedTimelineObjs);
    });
  }, []);

  /**
   * EventHandler to detect changes in the curr item selected
   * @param {number} itemIdx - the idx of the current selected item
   */
  const onCurrItemChange = (itemIdx) => {
    if (currItemIdx !== itemIdx) {
      timelineContainerRef.current.scrollTop =
        timelineItems[itemIdx].yPos - 200;
      const element = timelineItemsRef.current[itemIdx];
      element.focus();
    }
    setCurrItemIdx(itemIdx);
  };

  const onItemClick = (itemIdx) => {
    onCurrItemChange(itemIdx);
    setOpenBottomSheet(true);
  };

  return (
    <div className="timeline-container">
      <Helmet>
        <title>Timeline</title>
        <meta
          name="description"
          content="Historical and coup timelines curated by The Project Myanmar team."
        />
      </Helmet>
      <LoadingSpinner show={timelineItems.length === 0} />
      <div ref={timelineContainerRef} className="timeline-scroll-container">
        <div style={{ height: `${timelineHeight}px` }}>
          {timelineItems.map((item, itemIdx) => {
            const elements = [
              <TimelineItem
                key={`item-${item.yPos}`}
                item={item}
                id={`${itemIdx}`}
                ref={(el) => {
                  timelineItemsRef.current[itemIdx] = el;
                }}
                onClick={() => onItemClick(itemIdx)}
                autoFocus={isDesktop && itemIdx === 0}
                onlyDates={type === 'COUP'}
              />,
            ];
            if (itemIdx > 0) {
              elements.push(
                <Xarrow
                  key={`arrow-${item.yPos}`}
                  start={`${itemIdx - 1}`}
                  end={`${itemIdx}`}
                  startAnchor="bottom"
                  endAnchor="top"
                  showHead={false}
                  lineColor="white"
                  dashness={{ strokeLen: 15, nonStrokeLen: 10 }}
                />
              );
            }
            return elements;
          })}
        </div>
      </div>
      <Layout
        desktop={
          <div className="side-info-container">
            <TimelineEvents
              currItemIdx={currItemIdx}
              timelineItems={timelineItems}
              onChange={onCurrItemChange}
            />
          </div>
        }
        mobile={
          <TimelineBottomSheet
            open={openBottomSheet}
            item={timelineItems[currItemIdx]}
            onDismiss={() => setOpenBottomSheet(false)}
          />
        }
      />
    </div>
  );
};

Timeline.propTypes = {
  type: PropTypes.string,
};

Timeline.defaultProps = {
  type: 'HISTORY',
};

export default Timeline;
