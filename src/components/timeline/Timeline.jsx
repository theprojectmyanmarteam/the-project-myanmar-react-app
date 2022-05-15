import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Timeline.css';

import Xarrow from 'react-xarrows';
import TimelineEvents from './TimelineEvents';
import LoadingSpinner from '../LoadingSpinner';
import TimelineItem from './TimelineItem';

import { getHistoryData, getCoupData } from '../../js/fetchData';
import { extractTimeline } from '../../js/dataHelper';

const Timeline = ({ type }) => {
  const [currObjIdx, setCurrObjIdx] = useState(0);
  const [timelineObjects, setTimelineObjects] = useState([]);
  const [timelineHeight, setTimelineHeight] = useState(0);
  const timelineContainerRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const timelineOffsetRef = useRef(0);
  const prevItemDateRef = useRef('');

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
      setTimelineObjects(processedTimelineObjs);
    });
  }, []);

  /**
   * EventHandler to detect changes in the curr item selected
   * @param {number} objIdx - the idx of the current selected item
   */
  const onCurrItemChange = (objIdx) => {
    if (currObjIdx !== objIdx) {
      timelineContainerRef.current.scrollTop =
        timelineObjects[objIdx].yPos - 200;
      const element = timelineItemsRef.current[objIdx];
      element.focus();
    }
    setCurrObjIdx(objIdx);
  };

  return (
    <div className="timeline-container">
      <LoadingSpinner show={timelineObjects.length === 0} />
      <div ref={timelineContainerRef} className="timeline-scroll-container">
        <div style={{ height: `${timelineHeight}px` }}>
          {timelineObjects.map((obj, objIdx) => {
            const elements = [
              <TimelineItem
                key={`item-${obj.yPos}`}
                item={obj}
                id={`${objIdx}`}
                ref={(el) => {
                  timelineItemsRef.current[objIdx] = el;
                }}
                onClick={() => onCurrItemChange(objIdx)}
                autoFocus={objIdx === 0}
                onlyDates={type === 'COUP'}
              />,
            ];
            if (objIdx > 0) {
              elements.push(
                <Xarrow
                  key={`arrow-${obj.yPos}`}
                  start={`${objIdx - 1}`}
                  end={`${objIdx}`}
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
      <div className="side-info-container">
        <TimelineEvents
          currObjIdx={currObjIdx}
          timelineObjs={timelineObjects}
          onChange={onCurrItemChange}
        />
      </div>
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
