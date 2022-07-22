import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './BackButton.css';
import Button from 'react-bootstrap/Button';
import { BsChevronLeft } from 'react-icons/bs';

const BackButton = ({ route }) => {
  const history = useHistory();

  const onBackClick = () => {
    history.push({
      pathname: route,
    });
  };

  return (
    <Button variant="outline-light" className="back-btn" onClick={onBackClick}>
      <BsChevronLeft size={30} />
      <div className="back-btn-text"> Back</div>
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
