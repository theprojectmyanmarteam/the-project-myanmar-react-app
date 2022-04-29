/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './GroupsInTheCoup.css';
import * as am4core from '@amcharts/amcharts4/core';
// eslint-disable-next-line camelcase
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Helmet } from 'react-helmet';

import EventModal from '../EventModal';
import BasicModal from '../utils/BasicModal';
import BackButton from '../BackButton';
import LoadingSpinner from '../LoadingSpinner';

am4core.useTheme(am4themes_animated);

const GroupsInTheCoup = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [references, setReferences] = useState('');
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const BACKEND_API_BASE_URL = process.env.REACT_APP_BACKEND_API_BASE_URL;
  const BACKEND_API_SECRET = process.env.REACT_APP_BACKEND_API_SECRET;

  // Colors
  const ALMOST_BLACK = '#0f0f0f';
  const ALMOST_WHITE = '#e0e0e0';
  const GRAY = '#b5b5b5';

  const handleClose = () => {
    setShow(false);
  };
  // eslint-disable-next-line no-return-assign
  const handleShow = () => {
    setShow(true);
  };

  // useEffect for componentDidMount & componentDidUpdate
  useEffect(async () => {
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
    chart.events.on('appeared', () => {
      setLoaded(true);
    });
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
    series.dataFields.references = 'learnMore';
    series.dataFields.contentList = 'contentList';
    series.dataFields.isContentList = 'isContentList';

    // Custom color
    series.nodes.template.circle.fill = am4core.color(ALMOST_BLACK);
    series.nodes.template.circle.stroke = am4core.color(GRAY);
    series.nodes.template.outerCircle.fill = am4core.color(ALMOST_BLACK);
    series.nodes.template.outerCircle.stroke = am4core.color(GRAY);
    series.nodes.template.label.fill = am4core.color(ALMOST_WHITE);

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
        setTitle(event.target.dataItem.name);
        setContent(event.target.dataItem.content);
        setReferences(event.target.dataItem.references);
        // eslint-disable-next-line no-console
        console.log('references: ', references);
        // if (event.target.dataItem.isContentList) {
        //   setContent(event.target.dataItem.contentList);
        // } else {
        //   setContent(event.target.dataItem.content);
        // }
        handleShow();
      }
    });
    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <div className="groups-in-the-coup-container">
      <Helmet>
        <title>Groups In the Coup</title>
        <meta
          name="description"
          content="A graph visualization of groups and entities in the recent coup."
        />
      </Helmet>
      <LoadingSpinner show={!loaded} />
      <BackButton route="/" />
      <div id="chartdiv" style={{ width: '100%', height: '100%' }}>
        {/* <EventModal
          title={title}
          content={content}
          show={show}
          onHide={handleClose}
        /> */}
        <BasicModal
          title={title}
          content={content}
          references={references}
          show={show}
          setShow={setShow}
        />
      </div>
    </div>
  );
  // return (
  //   <BasicModal
  //     title="Title"
  //     content="This is a sample content"
  //     show={show}
  //     setShow={setShow}
  //   />
  // );
};

export default GroupsInTheCoup;
