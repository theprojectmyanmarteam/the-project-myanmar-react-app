import React from 'react';
import PropTypes from 'prop-types';
import MarkdownPreview from '@uiw/react-markdown-preview';
import './TextContainer.css';

const TextContainer = ({ title, description, references }) => {
  return (
    <div className="event-details-text-container">
      {title && <div className="event-details-title">{title}</div>}
      <MarkdownPreview
        className="event-details-description"
        source={description}
        style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: '20px',
        }}
        linkTarget="_blank"
      />
      {references && (
        <div className="event-details-learn-more">
          <h5>Learn more:</h5>
          <MarkdownPreview
            className="event-details-references"
            source={references}
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '15px',
            }}
            linkTarget="_blank"
          />
        </div>
      )}
    </div>
  );
};

TextContainer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  references: PropTypes.string,
};

TextContainer.defaultProps = {
  title: undefined,
  description: 'This is a sample.',
  references: '- [Sample](https://www.google.com)',
};

export default TextContainer;
