import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './DirectoryCard.css';
import { useSpring, animated, config } from 'react-spring';
import { useHistory } from 'react-router-dom';

import { VscFolder, VscFolderOpened } from 'react-icons/vsc';

const DirectoryCard = ({ name, route }) => {
  const history = useHistory();
  const [hoverState, setHoverState] = useState(false);

  // animation that moves this element
  const hoverAnim = useSpring({
    transform: hoverState ? 'scale(1.1)' : 'scale(1)',
    config: config.gentle,
  });

  return (
    <animated.div
      className="directory-card-container"
      style={hoverAnim}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      onClick={() => {
        history.push({
          pathname: route,
        });
        sessionStorage.setItem(name, true);
      }}
    >
      {sessionStorage.getItem(name) ? (
        <VscFolderOpened size={100} />
      ) : (
        <VscFolder size={100} />
      )}
      <div className="directory-card-name">{name}</div>
    </animated.div>
  );
};

DirectoryCard.propTypes = {
  name: PropTypes.string,
  route: PropTypes.string.isRequired,
  // icon: PropTypes.string,
};

DirectoryCard.defaultProps = {
  name: 'Page Name',
  // icon: '',
};

export default DirectoryCard;
