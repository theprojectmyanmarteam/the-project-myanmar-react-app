import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './BackButton.css';
import Button from 'react-bootstrap/Button';
import { BsArrowLeftShort } from 'react-icons/bs';

const BackButton = ({ route }) => {
  const history = useHistory();

  const onBackClick = () => {
    history.push({
      pathname: route,
    });
  };

  return (
    <Button variant="outline-light" className="back-btn" onClick={onBackClick}>
      <BsArrowLeftShort size={30} /> Back
    </Button>
  );
};

BackButton.propTypes = {
  route: PropTypes.string,
};

BackButton.defaultProps = {
  route: '',
};

export default BackButton;
