import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Timeline.css';

/* Imports */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesDark from '@amcharts/amcharts4/themes/dark';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

// eslint-disable-next-line no-unused-vars
const Timeline = ({ controllers }) => {
  const chartDiv = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [eventDates, setEventDates] = useState(
    new Set([
      '1826',
      '1852',
      '1885',
      '1937',
      '1940',
      '1942',
      '1945',
      '1947',
      '1962',
      '1988',
      '2007',
      '2008',
    ])
  );

  /* Chart code */
  // Themes begin
  am4core.useTheme(am4themesDark);
  am4core.useTheme(am4themesAnimated);
  am4core.options.autoSetClassName = true;
  // Themes end

  useEffect(() => {
    const chart = am4core.create(chartDiv.current, am4charts.RadarChart);
    chart.data = [
      {
        category: 'Anglo-Burmese Wars',
        startDate1: '1826',
        endDate1: '1885',
      },
      {
        category: 'Burma under the British',
        startDate2: '1885',
        endDate2: '1948',
      },
      {
        category: 'Independence and nation-building',
        startDate3: '1948',
        endDate3: '1962',
      },
      {
        category: 'Military Rule',
        startDate4: '1962',
        endDate4: '2011',
      },
    ];

    chart.padding(50, 20, 20, 20);
    chart.colors.step = 2;
    chart.dateFormatter.inputDateFormat = 'yyyy';
    chart.innerRadius = am4core.percent(40);

    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.renderer.labels.template.horizontalCenter = 'right';
    categoryAxis.renderer.labels.template.disabled = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.tooltipLocation = 0.5;
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.mouseEnabled = false;
    categoryAxis.tooltip.disabled = true;

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.labels.template.horizontalCenter = 'left';
    dateAxis.renderer.labels.template.adapter.add('text', (label) => {
      if (eventDates.has(label)) {
        return label;
      }
      return '';
    });
    dateAxis.events.on('hit', (e) => {
      console.log(e.event.target.textContent);
    });
    dateAxis.strictMinMax = true;
    dateAxis.renderer.maxLabelPosition = 0.99;
    dateAxis.renderer.grid.template.strokeOpacity = 0;
    dateAxis.min = new Date(1826, 0, 0, 0, 0, 0).getTime();
    dateAxis.max = new Date(2011, 0, 0, 0, 0, 0).getTime();
    dateAxis.mouseEnabled = true;
    dateAxis.tooltip.disabled = true;
    dateAxis.baseInterval = {
      timeUnit: 'year',
      count: 1,
    };
    dateAxis.renderer.minGridDistance = 0;
    dateAxis.renderer.labels.template.verticalCenter = 'middle';
    dateAxis.renderer.labels.template.horizontalCenter = 'middle';
    dateAxis.renderer.labels.template.relativeRotation = 90;
    dateAxis.renderer.labels.template.radius = 50;

    const circle = dateAxis.renderer.labels.template.createChild(
      am4core.Circle
    );
    circle.stroke = am4core.color('#FFFFFF');
    circle.strokeOpacity = 1;
    circle.fill = am4core.color('#FFFFFF');
    circle.strokeWidth = 2;

    const line = dateAxis.renderer.labels.template.createChild(am4core.Line);
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
    line.dy = 8;
    line.strokeOpacity = 1;
    line.stroke = am4core.color('#FFFFFF');
    line.strokeDasharray = '2,3';
    line.strokeOpacity = 1;

    const series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.name = 'Series 1';
    series1.dataFields.openDateX = 'startDate1';
    series1.dataFields.dateX = 'endDate1';
    series1.dataFields.categoryY = 'category';
    series1.clustered = false;
    series1.columns.template.radarColumn.cornerRadius = 30;
    series1.columns.template.tooltipText =
      "{category}: {openDateX.formatDate('yyyy')} - {dateX.formatDate('yyyy')}";

    const series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.name = 'Series 2';
    series2.dataFields.openDateX = 'startDate2';
    series2.dataFields.dateX = 'endDate2';
    series2.dataFields.categoryY = 'category';
    series2.clustered = false;
    series2.columns.template.radarColumn.cornerRadius = 30;
    series2.columns.template.tooltipText =
      "{category}: {openDateX.formatDate('yyyy')} - {dateX.formatDate('yyyy')}";

    const series3 = chart.series.push(new am4charts.RadarColumnSeries());
    series3.name = 'Series 3';
    series3.dataFields.openDateX = 'startDate3';
    series3.dataFields.dateX = 'endDate3';
    series3.dataFields.categoryY = 'category';
    series3.clustered = false;
    series3.columns.template.radarColumn.cornerRadius = 30;
    series3.columns.template.tooltipText =
      "{category}: {openDateX.formatDate('yyyy')} - {dateX.formatDate('yyyy')}";

    const series4 = chart.series.push(new am4charts.RadarColumnSeries());
    series4.name = 'Series 4';
    series4.dataFields.openDateX = 'startDate4';
    series4.dataFields.dateX = 'endDate4';
    series4.dataFields.categoryY = 'category';
    series4.clustered = false;
    series4.columns.template.radarColumn.cornerRadius = 30;
    series4.columns.template.tooltipText =
      "{category}: {openDateX.formatDate('yyyy')} - {dateX.formatDate('yyyy')}";

    /*
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.exportable = false;
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.exportable = false; */

    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.innerRadius = am4core.percent(40);
    chart.cursor.lineY.disabled = true;

    const yearLabel = chart.radarContainer.createChild(am4core.Label);
    yearLabel.text = '#history';
    yearLabel.fontSize = 30;
    yearLabel.horizontalCenter = 'middle';
    yearLabel.verticalCenter = 'middle';
    return () => {
      chart.dispose();
    };
  }, []);

  return <div ref={chartDiv} className="timeline-container" />;
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
