import React, { useState, useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
// eslint-disable-next-line camelcase
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import EventModal from '../EventModal';

am4core.useTheme(am4themes_animated);

const GroupsInTheCoup = () => {
  const [show, setShow] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventContent, setEventContent] = useState('');
  const [data, setData] = useState([]);

  const BACKEND_API_BASE_URL = process.env.REACT_APP_BACKEND_API_BASE_URL;
  const BACKEND_API_SECRET = process.env.REACT_APP_BACKEND_API_SECRET;

  const handleClose = () => {
    setShow(false);
  };
  // eslint-disable-next-line no-return-assign
  const handleShow = () => {
    setShow(true);
  };

  // useEffect for componentDidMount & componentDidUpdate
  useEffect(async () => {
    // eslint-disable-next-line no-console
    console.log('URL: ', BACKEND_API_BASE_URL);
    let res = await fetch(
      `${BACKEND_API_BASE_URL}/sections?title=The%20Groups%20in%20the%20Coup`,
      {
        headers: {
          apiSecret: BACKEND_API_SECRET,
        },
      }
    );
    res = await res.json();
    setData(res.data);
  }, []);

  // useEffect for when 'data' is updated
  // 'data' is the data used in amCharts ForceDirectedSeries fetched from MongoDB
  useEffect(() => {
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
    series.dataFields.contentList = 'contentList';
    series.dataFields.isContentList = 'isContentList';

    // Add labels
    series.nodes.template.label.text = '{name}';
    series.minRadius = 80;
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
        Math.ceil(event.target.circle.radius * 0.23)
        // Math.ceil(tempRadius * 0.25)
      );
      // eslint-disable-next-line no-param-reassign
      event.target.fontSize = fontSize;
      // eslint-disable-next-line no-param-reassign
      event.target.label.fontSize = fontSize;
    });
    series.nodes.template.label.wrap = true;

    series.nodes.template.events.on('hit', (event) => {
      if (event.target.dataItem && event.target.dataItem.hasContent) {
        setEventTitle(event.target.dataItem.name);
        if (event.target.dataItem.isContentList) {
          setEventContent(event.target.dataItem.contentList);
        } else {
          setEventContent(event.target.dataItem.content);
        }
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
    </div>
  );
};

export default GroupsInTheCoup;
