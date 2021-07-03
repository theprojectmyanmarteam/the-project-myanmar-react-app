// import React, { useRef, useLayoutEffect } from 'react';
import React, { useState, useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
// eslint-disable-next-line camelcase
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import EventModal from '../EventModal';

// const axios = require('axios').default;

am4core.useTheme(am4themes_animated);

const GroupsInTheCoup = () => {
  const [show, setShow] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventContent, setEventContent] = useState('');
  //   const showRef = useRef(false);
  //   const eventTitleRef = useRef('');
  //   const eventContentRef = useRef('');
  const [data, setData] = useState([]);

  const handleClose = () => {
    setShow(false);
    // showRef.current = false;
  };
  // eslint-disable-next-line no-return-assign
  const handleShow = () => {
    setShow(true);
    // showRef.current = true;
  };

  //   function renderModal() {
  //     return (
  //       <EventModal
  //         title={eventTitleRef.current}
  //         content={eventContentRef.current}
  //         show={showRef.current}
  //         onHide={handleClose}
  //       />
  //     );
  //   }

  // useEffect for componentDidMount & componentDidUpdate
  useEffect(async () => {
    let res = await fetch(
      `https://projectmyanmar.herokuapp.com/projectmm/sections`,
      {
        headers: {
          apiSecret: '1234',
        },
      }
    );
    res = await res.json();
    const sections = res.filter(
      (elem) => elem.title === 'The Groups in the Coup'
    );
    setData(sections[0].data);
  }, []);

  // useEffect for when 'data' is updated
  // 'data' is the data used in amCharts ForceDirectedSeries fetched from MongoDB
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('HERE: ', data);
    // Create chart
    const chart = am4core.create(
      'chartdiv',
      am4plugins_forceDirected.ForceDirectedTree
    );
    // Create series
    const series = chart.series.push(
      new am4plugins_forceDirected.ForceDirectedSeries()
    );
    series.data = data;
    // Set up data fields
    series.dataFields.value = 'value';
    series.dataFields.name = 'name';
    series.dataFields.children = 'children';
    series.dataFields.collapsed = 'collapsed';
    series.dataFields.hasContent = 'hasContent';
    series.dataFields.content = 'content';

    // Add labels
    series.nodes.template.label.text = '{name}';
    // series.fontSize = 20;
    series.minRadius = 30;
    series.maxRadius = 80;

    // Tool tip settings
    series.nodes.template.tooltipText = '{description}';
    series.tooltip.label.wrap = true;
    series.tooltip.label.width = 300;

    // Custom font size for each node
    // source: https://stackoverflow.com/questions/56868925/amchart-4-force-directed-tree-dynamic-font-size
    series.nodes.template.events.on('ready', (event) => {
      const fontSize = Math.min(
        45,
        Math.ceil(event.target.circle.radius * 0.25)
      );
      // eslint-disable-next-line no-param-reassign
      event.target.fontSize = fontSize;
    });
    series.nodes.template.label.wrap = true;

    series.nodes.template.events.on('hit', (event) => {
      if (event.target.dataItem && event.target.dataItem.hasContent) {
        setEventTitle(event.target.dataItem.name);
        // eslint-disable-next-line no-console
        // console.log('eventTitleRef: ', eventTitleRef.current);
        // eventTitleRef.current = event.target.dataItem.name;
        setEventContent(event.target.dataItem.content);
        // eslint-disable-next-line no-console
        // console.log('eventContentRef: ', eventContentRef.current);
        // eventContentRef.current = event.target.dataItem.content;
        handleShow();
      }
    });
    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <div id="chartdiv" style={{ width: '100%', height: '100%' }}>
      <EventModal
        title={eventTitle}
        content={eventContent}
        show={show}
        onHide={handleClose}
      />
      {/* {renderModal()} */}
    </div>
  );
};

export default GroupsInTheCoup;
