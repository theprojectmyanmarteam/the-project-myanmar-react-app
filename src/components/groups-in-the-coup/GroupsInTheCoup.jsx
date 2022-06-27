/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './GroupsInTheCoup.css';
import * as am4core from '@amcharts/amcharts4/core';
// eslint-disable-next-line camelcase
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Helmet } from 'react-helmet';
import { useMediaQuery } from 'react-responsive';

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

  const isMobile = useMediaQuery({ query: '(max-width: 450px)' });

  const BACKEND_API_BASE_URL = process.env.REACT_APP_BACKEND_API_BASE_URL;
  const BACKEND_API_SECRET = process.env.REACT_APP_BACKEND_API_SECRET;

  // Colors
  const ALMOST_BLACK = '#0f0f0f';
  const ALMOST_WHITE = '#e0e0e0';
  const ALMOST_GRAY = '#212529';
  const GRAY = '#b5b5b5';

  // Size
  const MOBILE_NODE_RADIUS = 60;
  const DESKTOP_NODE_RADIUS = 80;
  const MOBILE_LABEL_MIN_FONT_SIZE = 20;
  const DESKTOP_LABEL_MIN_FONT_SIZE = 45;

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

    // Tool tip settings
    series.nodes.template.tooltipText = '{description}';
    series.tooltip.label.wrap = true;

    // if user is using on a mobile device, decrease the size of nodes & labels
    if (isMobile) {
      series.minRadius = MOBILE_NODE_RADIUS;
      series.maxRadius = MOBILE_NODE_RADIUS;
      series.tooltip.label.width = 150;
    } else {
      series.minRadius = DESKTOP_NODE_RADIUS;
      series.maxRadius = DESKTOP_NODE_RADIUS;
      series.tooltip.label.width = 300;
    }

    // Custom font size for each node
    // source: https://stackoverflow.com/questions/56868925/amchart-4-force-directed-tree-dynamic-font-size
    series.nodes.template.events.on('ready', (event) => {
      const minFontSize = isMobile
        ? MOBILE_LABEL_MIN_FONT_SIZE
        : DESKTOP_LABEL_MIN_FONT_SIZE;
      const radius = isMobile ? MOBILE_NODE_RADIUS : DESKTOP_NODE_RADIUS;
      const fontSize = Math.min(minFontSize, Math.ceil(radius * 0.23));
      // eslint-disable-next-line no-param-reassign
      event.target.fontSize = fontSize;
      // eslint-disable-next-line no-param-reassign
      event.target.label.fontSize = fontSize;
    });
    series.nodes.template.label.wrap = true;

    series.nodes.template.events.on('hit', (event) => {
      const targetNode = event.target;
      // auto-collapse other root nodes when different root node is exploded
      if (targetNode.isActive) {
        series.nodes.each((node) => {
          if (
            targetNode !== node &&
            node.isActive &&
            targetNode.dataItem.level === node.dataItem.level
          ) {
            // eslint-disable-next-line no-param-reassign
            node.isActive = false;
            // eslint-disable-next-line no-param-reassign
            node.circle.fill = am4core.color(ALMOST_BLACK);
            // eslint-disable-next-line no-param-reassign
            node.label.fill = am4core.color(ALMOST_WHITE);
          } else {
            // for uncollapsed leaf nodes, display pointer cursor on hover
            // eslint-disable-next-line no-param-reassign
            node.cursorOverStyle = am4core.MouseCursorStyle.pointer;
          }
        });
        if (targetNode.dataItem.level === 0) {
          targetNode.circle.fill = am4core.color(ALMOST_GRAY);
          targetNode.label.fill = am4core.color(ALMOST_WHITE);
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (targetNode.dataItem.level === 0) {
          targetNode.circle.fill = am4core.color(ALMOST_BLACK);
          targetNode.label.fill = am4core.color(ALMOST_WHITE);
        }
      }
      if (event.target.dataItem && event.target.dataItem.hasContent) {
        setTitle(event.target.dataItem.name);
        setContent(event.target.dataItem.content);
        setReferences(event.target.dataItem.references);
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
};

export default GroupsInTheCoup;
