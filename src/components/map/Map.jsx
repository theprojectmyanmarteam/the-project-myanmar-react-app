/* eslint-disable */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated, config } from 'react-spring';
import './Map.css';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4geodata_data_countries2 from '@amcharts/amcharts4-geodata/data/countries2';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);
am4core.addLicense('ch-custom-attribution');

var continents = {
  AF: 0,
  AN: 1,
  AS: 2,
  EU: 3,
  NA: 4,
  OC: 5,
  SA: 6,
};

const Map = ({ onHide, visible }) => {
  const chart = useRef(null);

  const [showMap, setShowMap] = useState(visible);
  const [renderMap, setRenderMap] = useState(true);

  const mapAnim = useSpring({
    opacity: visible ? 1 : 0,
    display: visible ? 'flex' : 'none',
    config: config.slow,
  });

  //const chart = useRef(null);

  useEffect(() => {
    if (!visible) {
      onHide();
    } else {
      setRenderMap(true);
    }
    setShowMap(visible);

    /* Chart code */

    /* Create map instance */
    let x = am4core.create('mapdiv', am4maps.MapChart);

    /* Set map definition */
    x.geodata = am4geodata_worldLow;

    /* Set projection */
    x.projection = new am4maps.projections.Miller();

    /* Create map polygon series */
    let polygonSeries = x.series.push(new am4maps.MapPolygonSeries());

    /* Make map load polygon (like country names) data from GeoJSON */
    polygonSeries.useGeodata = true;
    polygonSeries.geodata = am4geodata_worldLow;

    /* Configure series */
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.applyOnClones = true;
    polygonTemplate.togglable = true;
    //polygonTemplate.tooltipText = '{name}';
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeOpacity = 0.5;
    polygonTemplate.fill = x.colors.getIndex(0);
    let lastSelected;

    // Create country specific series (but hide it for now)
    var countrySeries = x.series.push(new am4maps.MapPolygonSeries());
    countrySeries.useGeodata = true;
    countrySeries.hide();
    countrySeries.geodataSource.events.on('done', function (ev) {
      polygonSeries.hide();
      countrySeries.show();
    });

    var countryPolygon = countrySeries.mapPolygons.template;
    countryPolygon.tooltipText = '{name}';
    countryPolygon.nonScalingStroke = true;
    countryPolygon.strokeOpacity = 0.5;
    countryPolygon.fill = am4core.color('#eee');

    polygonTemplate.events.on('hit', function (ev) {
      if (lastSelected) {
        // This line serves multiple purposes:
        // 1. Clicking a country twice actually de-activates, the line below
        //    de-activates it in advance, so the toggle then re-activates, making it
        //    appear as if it was never de-activated to begin with.
        // 2. Previously activated countries should be de-activated.+-
        lastSelected.isActive = false;
      }
      ev.target.series.chart.zoomToMapObject(ev.target);
      if (lastSelected !== ev.target) {
        lastSelected = ev.target;
      }
      if (ev.target.dataItem._dataContext.name === 'Myanmar') {
        console.log('clicked on myanmar');
        //ev.target.isActive = !ev.target.isActive;
        var hs = countryPolygon.states.create('hover');
        hs.properties.fill = x.colors.getIndex(9);
        var map = ev.target.dataItem.dataContext.map;
        if (map) {
          ev.target.isHover = false;
          countrySeries.geodataSource.url =
            'https://cdn.amcharts.com/lib/4/geodata/json/' + map + '.json';

          countrySeries.geodataSource.load();
          back.show();
          toggleMMOnlyStyle();
          x.seriesContainer.draggable = false;
        }
      } else {
        console.log('Did not click on myanmar');
        x.goHome();
      }
    });

    // Set up data for countries
    var data = [];
    for (var id in am4geodata_data_countries2) {
      if (am4geodata_data_countries2.hasOwnProperty(id)) {
        var country = am4geodata_data_countries2[id];
        if (country.maps.length) {
          data.push({
            id: id,
            color: x.colors.getIndex(continents[country.continent_code]),
            map: country.maps[0],
          });
        }
      }
    }

    polygonSeries.data = data;

    /* Create selected and hover states and set alternative fill color */
    let ss = polygonTemplate.states.create('active');
    ss.properties.fill = x.colors.getIndex(2);

    // let hs = polygonTemplate.states.create('hover');
    // hs.properties.fill = x.colors.getIndex(4);

    // Hide Antarctica
    polygonSeries.exclude = ['AQ'];

    // Zoom control
    //x.zoomControl = new am4maps.ZoomControl();
    x.seriesContainer.draggable = true;
    x.seriesContainer.resizable = false;
    x.panBehavior = 'none';
    x.events.on('zoomlevelchanged', function () {
      // queue event loop so a final zoomlevelchanged can be "caught"
      setTimeout(function () {
        if (x.zoomLevel <= 1.0001) {
          x.panBehavior = 'none';
        } else if (x.zoomLevel > 1) {
          x.panBehavior = 'move';
        }
      }, 0);
    });

    let homeButton = new am4core.Button();
    homeButton.events.on('hit', function () {
      x.goHome();
    });

    // Add zoomout button
    var back = x.createChild(am4core.ZoomOutButton);
    back.align = 'right';
    back.hide();
    back.events.on('hit', function (ev) {
      x.seriesContainer.draggable = true;
      polygonSeries.show();
      x.goHome();
      countrySeries.hide();
      back.hide();
      toggleMMOnlyStyle();
    });

    homeButton.icon = new am4core.Sprite();
    homeButton.padding(7, 5, 7, 5);
    homeButton.width = 30;
    homeButton.icon.path =
      'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';
    homeButton.marginBottom = 10;
    homeButton.parent = x.zoomControl;
    //homeButton.insertBefore(x.zoomControl.plusButton);

    chart.current = x;

    function toggleMMOnlyStyle() {
      console.log('Changed Maps');
      let div = document.getElementById('mapdiv');
      if (div.classList.contains('myanmar-only')) {
        div.classList.remove('myanmar-only');
      } else {
        div.classList.add('myanmar-only');
      }
    }

    return () => {
      x.dispose();
    };
  }, []);

  return (
    <animated.div id="splash-container" style={mapAnim}>
      <div id="mapdiv" className="mapdiv"></div>
    </animated.div>
  );
};

Map.propTypes = {
  onHide: PropTypes.func,
  visible: PropTypes.bool,
};

Map.defaultProps = {
  onHide: () => {},
  visible: true,
};

export default Map;
