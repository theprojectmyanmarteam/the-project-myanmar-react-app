// import React, { useRef, useLayoutEffect } from 'react';
import React, { useState, useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useLayoutEffect(() => {
    // Create chart
    const chart = am4core.create(
      'chartdiv',
      am4plugins_forceDirected.ForceDirectedTree
    );

    // Create series
    const series = chart.series.push(
      new am4plugins_forceDirected.ForceDirectedSeries()
    );

    // Set data
    series.data = [
      {
        name: 'TEXT', // 'The Media',
        description:
          'Different types of media that play a big role in the Coup',
        collapsed: true,
        children: [
          {
            name: 'Local',
            value: 100,
          },
          {
            name: 'State-run (MRTV)',
            value: 60,
          },
          {
            name: 'International: CNN',
            value: 30,
          },
        ],
      },
      {
        name: 'TEXT', // 'Pre-Coup Political Parties',
        collapsed: true,
        children: [
          {
            name: 'NLD',
            value: 135,
          },
          {
            name: 'USDP',
            value: 98,
          },
          {
            name: 'Thura Shwe Mann’s party whose name I always forget',
            value: 56,
          },
          {
            name: 'Ethnic Parties',
            value: 40,
          },
        ],
      },
      {
        name: 'TEXT', // 'Tatmadaw',
        collapsed: true,
        children: [
          {
            name: 'State Administration Council (SAC)',
            value: 335,
          },
        ],
      },
      {
        name: 'TEXT', // 'The People',
        collapsed: true,
        children: [
          {
            name:
              'Daw Ei Thinzar Maung, now Deputy Minister of Women, Youths, and Children Affairs',
            value: 415,
          },
          {
            name:
              'Ko Wai Moe Naing, The Panda of Monywa, Sagaing, now arrested and charged',
            value: 148,
          },
          {
            name: 'Ko Min Ko Naing',
            value: 89,
          },
        ],
      },
      {
        name: 'TEXT', // 'Representatives of the People',
        collapsed: true,
        children: [
          {
            name: 'CRPH (Committee Representing Pyidaungsu Hluttaw)',
            value: 687,
          },
          {
            name: 'NUG (National Unity Government of Myanmar)',
            value: 148,
          },
          {
            name: 'General Strike Committee',
            value: 148,
          },
        ],
      },
      {
        name: 'TEXT', // 'EAOs',
        collapsed: true,
        children: [
          {
            name: 'KIA',
            value: 687,
          },
          {
            name: 'KNU/KNLA',
            value: 148,
          },
          {
            name: 'Arakan Army',
            value: 148,
          },
        ],
      },
      {
        name: 'TEXT', // 'Myanmar and the World',
        collapsed: true,
        hasContent: false,
        children: [
          {
            name: 'ASEAN',
            description: 'Association of Southeast Asian Nations',
            collapsed: true,
            hasContent: false,
            children: [
              {
                name: 'Myanmar',
                description:
                  'The place of the Coup. This is where citizens are being tortured for supporting democracy',
                value: 400,
                hasContent: true,
                content:
                  'Myanmar is located in Southeast Asia. It is a beautiful country... before the coup',
              },
              {
                name: 'Brunei',
                value: 150,
                hasContent: false,
                content: null,
              },
              {
                name: 'Cambodia',
                value: 200,
              },
              {
                name: 'Indonesia',
                value: 225,
              },
              {
                name: 'Laos',
                value: 150,
              },
              {
                name: 'Malaysia',
                value: 150,
              },
              {
                name: 'Philippines',
                value: 250,
              },
              {
                name: 'Singapore',
                value: 250,
              },
              {
                name: 'Thailand',
                value: 150,
              },
              {
                name: 'Vietnam',
                value: 150,
              },
            ],
          },
          {
            name: 'UN',
            value: 300,
          },
          {
            name: 'China',
            value: 300,
          },
          {
            name: 'US',
            value: 300,
          },
          {
            name: 'UK + EU',
            value: 300,
          },
          {
            name: 'Australia',
            value: 300,
          },
          {
            name: 'South Korea',
            value: 650,
          },
          {
            name: 'India',
            value: 300,
          },
          {
            name: 'Japan',
            value: 300,
          },
          {
            name: 'Russia',
            value: 300,
          },
        ],
      },
    ];

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
      if (event.target.dataItem.name === 'ASEAN') {
        // eslint-disable-next-line no-console
        console.log('ASEAN!!');
        // eslint-disable-next-line no-console
        console.log('ASEAN Size: ', event.target.fontSize);
      }
      if (event.target.dataItem.name === 'TEXT') {
        // eslint-disable-next-line no-console
        console.log('TEXT!!');
        // eslint-disable-next-line no-console
        console.log('TEXT Size: ', event.target.fontSize);
      }
    });
    series.nodes.template.label.wrap = true;

    // series.nodes.template.adapter
    // series.nodes.template.add('fontSize', (text, target, key) => {
    //   // eslint-disable-next-line no-console
    //   console.log('text: ', text);
    //   // eslint-disable-next-line no-console
    //   console.log('target: ', target);
    //   // eslint-disable-next-line no-console
    //   console.log('key: ', key);
    //   return `>>> ${text} <<<`;
    // });

    series.nodes.template.events.on('hit', (event) => {
      if (event.target.dataItem && event.target.dataItem.hasContent) {
        setEventTitle(event.target.dataItem.name);
        setEventContent(event.target.dataItem.content);
        handleShow();
        // eslint-disable-next-line default-case
        // switch (event.target.dataItem.level) {
        //   case 0:
        //     // eslint-disable-next-line no-console
        //     console.log(`Level ${event.target.dataItem.level}`);
        //   // eslint-disable-next-line no-fallthrough
        //   case 1:
        //     // eslint-disable-next-line no-console
        //     console.log(`Level ${event.target.dataItem.level}`);
        //   // eslint-disable-next-line no-fallthrough
        //   case 2:
        //     // eslint-disable-next-line no-console
        //     console.log(`Level ${event.target.dataItem.level}`);
        // }
      }
    });

    return () => {
      chart.dispose();
    };
  }, []);

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
