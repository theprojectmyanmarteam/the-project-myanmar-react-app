import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Timeline.css';

/* Imports */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesDark from '@amcharts/amcharts4/themes/dark';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

import { useSpring, animated, config } from 'react-spring';
import TimelineEvents from './TimelineEvents';
import LoadingSpinner from '../LoadingSpinner';
import BackButton from '../BackButton';

// eslint-disable-next-line no-unused-vars
const Timeline = ({ controllers }) => {
  const chartDiv = useRef(null);
  const [currEvent, setCurrEvent] = useState('');
  const [rotDeg, setRotDeg] = useState(0);
  const timelineLabels = useRef(null);
  const currLabelElem = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [eventDates, setEventDates] = useState([
    {
      name: 'The Anglo-Burmese Wars',
      start: '1824',
      end: '1885',
      dates: ['1826', '1852', '1885'],
    },
    {
      name: 'Colonization',
      start: '1886',
      end: '1948',
      dates: ['1937', '1940', '1942', '1945', '1947'],
    },
    {
      name: 'Nation Building',
      start: '1949',
      end: '1962',
      dates: ['1962'],
    },
    {
      name: 'A Military Myanmar',
      start: '1963',
      end: '1988',
      dates: ['1988'],
    },
    {
      name: 'Union of Myanmar',
      start: '1989',
      end: '2010',
      dates: ['2007', '2008'],
    },
  ]);

  useEffect(() => {
    setCurrEvent(eventDates[0].dates[0]);
  }, []);

  /* Chart code */
  // Themes begin
  am4core.useTheme(am4themesDark);
  am4core.useTheme(am4themesAnimated);
  am4core.options.autoSetClassName = true;
  const colorSet = new am4core.ColorSet();
  // Themes end

  const dateOrEventExists = (value) => {
    return (
      eventDates.some((event) => event.name === value) ||
      eventDates.some((event) => event.dates.includes(value))
    );
  };

  const findRotation = (label) => {
    if (label.x < 0) {
      let rot = -label.properties.rotation + 180;
      if (rot > 90) {
        rot -= 360;
      }
      setRotDeg(rot);
    } else {
      setRotDeg(-label.properties.rotation);
    }
  };

  const setActiveLabel = (label) => {
    const allLabels = timelineLabels.current;
    // set active states for the labels
    for (let i = 0; i < allLabels.length; i += 1) {
      if (allLabels[i].currentText && allLabels[i].currentText !== label) {
        allLabels[i].isActive = false;
      } else if (allLabels[i].currentText === label) {
        findRotation(allLabels[i]);
        allLabels[i].isActive = true;
        currLabelElem.current = allLabels[i];
      }
    }
  };

  const resetNodes = () => {
    const allLabels = timelineLabels.current;
    for (let i = 0; i < allLabels.length; i += 1) {
      if (allLabels[i].children.values.length === 2) {
        const line = allLabels[i].children.values[0];
        const circle = allLabels[i].children.values[1];
        if (allLabels[i].x < 0) {
          line.x2 = 269;
          line.x1 = 39;
          circle.x = 44;
        } else {
          line.x2 = -240;
          line.x1 = -10;
          circle.x = -15;
        }
      }
    }
    if (currLabelElem.current) {
      findRotation(currLabelElem.current);
    }
  };

  useEffect(() => {
    if (timelineLabels.current) {
      setActiveLabel(currEvent);
    }
  }, [currEvent]);

  const onEventChange = (event) => {
    setCurrEvent(event);
  };

  useEffect(() => {
    const chart = am4core.create(chartDiv.current, am4charts.RadarChart);
    chart.data = [
      {
        category: 'placeholder',
        startDate1: '1826',
        endDate1: '2010',
      },
    ];

    chart.padding(40, 40, 40, 40);
    chart.colors.step = 2;
    chart.dateFormatter.inputDateFormat = 'yyyy';
    chart.innerRadius = am4core.percent(40);
    chart.events.on('appeared', () => {
      setLoaded(true);
    });

    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.labels.template.disabled = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.tooltipLocation = 0.5;
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.mouseEnabled = false;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.endLocation = 1;

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    const labels = dateAxis.renderer.labels.template;

    labels.horizontalCenter = 'middle';
    labels.verticalCenter = 'middle';
    labels.relativeRotation = 90;
    labels.fontSize = 12;
    labels.adapter.add('text', (label) => {
      if (dateOrEventExists(label)) {
        return label;
      }
      return '';
    });
    timelineLabels.current = labels.clones.values;
    labels.events.on('hit', (e) => {
      setCurrEvent(e.target.currentText);
    });
    labels.zIndex = -1;
    dateAxis.strictMinMax = true;
    dateAxis.renderer.maxLabelPosition = 1;
    dateAxis.renderer.grid.template.strokeOpacity = 0;
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.min = new Date(1826, 0, 0, 0, 0, 0);
    dateAxis.max = new Date(2010, 0, 0, 0, 0, 0);
    dateAxis.mouseEnabled = false;
    dateAxis.baseInterval = {
      timeUnit: 'year',
      count: 1,
    };
    dateAxis.renderer.minGridDistance = 0;
    dateAxis.events.on('startendchanged', resetNodes);
    dateAxis.events.on('rangechangeended', resetNodes);

    labels.radius = 65;
    labels.align = 'middle';
    labels.setStateOnChildren = true;
    dateAxis.tooltip.disabled = true;

    const line = labels.createChild(am4core.Line);
    line.adapter.add('x2', (l, target) => {
      if (target.parent.x < 0) {
        return 269;
      }
      return -240;
    });
    line.adapter.add('x1', (l, target) => {
      if (target.parent.x < 0) {
        return 39;
      }
      return -10;
    });
    // line.x2 = -240;
    // line.x1 = -10;
    line.dy = 8;
    line.strokeOpacity = 1;
    line.stroke = am4core.color('#FFFFFF');
    // line.strokeDasharray = '2,3';
    line.strokeWidth = 2;
    line.zIndex = -10;

    const circle = labels.createChild(am4core.Circle);
    circle.strokeOpacity = 1;
    circle.stroke = am4core.color('#FFFFFF');
    circle.strokeWidth = 2;
    circle.radius = 8;
    circle.fill = am4core.color('#0f0f0f');
    circle.adapter.add('x', (l, target) => {
      if (target.parent.x < 0) {
        return 44;
      }
      return -15;
    });
    // circle.x = -15;
    circle.dy = 8;
    circle.zIndex = -10;
    const circleHoverState = circle.states.create('hover');
    circleHoverState.properties.scale = 1.3;

    const circleActiveState = circle.states.create('active');
    circleActiveState.properties.scale = 1.3;
    // circleActiveState.properties.x = -15;

    const createRange = (text, startDate, endDate, color) => {
      const range = dateAxis.axisRanges.create();
      range.axisFill.interactionsEnabled = true;
      range.date = startDate;
      range.endDate = endDate;
      range.axisFill.fill = color;
      range.axisFill.above = true;
      range.axisFill.parent = dateAxis;
      range.parent = dateAxis;
      range.axisFill.zIndex = 1;
      range.grid.above = true;
      range.grid.disabled = true;
      range.label.interactionsEnabled = false;
      range.label.bent = true;
      range.label.text = text;
      range.label.disposeChildren();

      const { axisFill, label } = range;
      axisFill.innerRadius = -50;
      axisFill.radius = -0.01;
      axisFill.disabled = false; // as regular fills are disabled, we need to enable this one
      axisFill.fillOpacity = 1;
      axisFill.togglable = true;
      axisFill.zIndex = 10;

      axisFill.showSystemTooltip = true;
      axisFill.readerTitle = 'click to zoom';
      axisFill.cursorOverStyle = am4core.MouseCursorStyle.pointer;

      axisFill.events.on('hit', (event) => {
        const { dataItem } = event.target;
        if (!event.target.isActive) {
          dateAxis.zoom({ start: 0, end: 1 });
          // range.label.rotation = 0;
        } else {
          dateAxis.zoomToDates(dataItem.date, dataItem.endDate);
          // range.label.rotation = 180;
        }
      });

      // hover state
      const rangeHoverState = axisFill.states.create('hover');
      rangeHoverState.properties.innerRadius = -55;
      rangeHoverState.properties.radius = -5;

      label.location = 0.5;
      label.fill = am4core.color('black');
      label.radius = -35;
      label.relativeRotation = 0;
      label.fontSize = 15;
      label.fontWeight = 'bold';
    };

    eventDates.forEach((event, idx) => {
      createRange(
        event.name,
        new Date(parseInt(event.start, 10), 0, 0, 0, 0),
        new Date(parseInt(event.end, 10) + 1, 0, 0, 0, 0),
        colorSet.getIndex(idx * 3)
      );
    });

    const series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.name = 'placeholder';
    series1.dataFields.openDateX = 'startDate1';
    series1.dataFields.dateX = 'endDate1';
    series1.dataFields.categoryY = 'category';
    series1.clustered = true;
    series1.columns.template.disabled = true;

    return () => {
      chart.dispose();
    };
  }, []);

  // animation for next button
  // -> fade in
  const timelineAnim = useSpring({
    transform: `rotate(${-rotDeg}deg) `,
    config: config.default,
  });

  return (
    <div className="timeline-container">
      <LoadingSpinner show={!loaded} />
      <BackButton route="/" />
      <div className="timeline-chart-container">
        <animated.div className="timeline-circle" style={timelineAnim}>
          <svg
            className="timeline-circle"
            width="400"
            height="400"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <circle
              cx="200"
              cy="200"
              r="120"
              stroke="white"
              strokeWidth="25"
              fill="none"
            />
            <path fill="white" d="M315 155 L315 245 L370 200 Z" />
          </svg>
        </animated.div>
        <div className="timeline-title">#history</div>
        <div ref={chartDiv} className="chart-container" />
      </div>
      <div className="side-info-container">
        <TimelineEvents
          currEvent={currEvent}
          eventData={eventDates}
          onChange={onEventChange}
        />
      </div>
    </div>
  );
};

Timeline.propTypes = {
  controllers: PropTypes.shape({
    enableScroll: PropTypes.func,
    moveNext: PropTypes.func,
    movePrev: PropTypes.func,
  }),
};

Timeline.defaultProps = {
  controllers: {},
};

export default Timeline;
