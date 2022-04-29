import React from 'react';
import PropTypes from 'prop-types';
import './EventDetails.css';
// import MarkdownPreview from '@uiw/react-markdown-preview';
import TextContainer from '../utils/text-container/TextContainer';

// eslint-disable-next-line no-unused-vars
const EventDetails = ({ date, description, references, title }) => {
  // eslint-disable-next-line no-unused-vars
  const example =
    'The second Anglo Burmese war was initiated by the British occupation of the Port of Matarban, a Burmese territory off of the coast of Mawlamyine. Tensions were still high between [the Company](https://en.wikipedia.org/wiki/East_India_Company) and the Burmese following the first war. The misrepresentation of Burmese affairs to the country back in Britain was assigned as the cause of the decision to invade and annex Burma. The war ended in a year without any treaties ever being signed after the Company sacked many of the most sacred pagodas. \n \n The British and Burmese forces had been butting heads all across their newly defined borders throughout the first half of the century. Various ethnic groups used the instability as the opportunity to fight for their autonomy from the Bamars during this period. British historians depicted the fragmented ethnic groups as a reason as to why the people within the region needed the Empire to install “peace”, “civility”, and “order”. However, these Western-centric accounts usually left out the pre-existing historical and cultural norms, intricate judicial systems, and how colonialism destroyed these highly intricate, self-sufficient systems to be replaced by ones that only served the British Empire.';
  // eslint-disable-next-line no-unused-vars
  const exampleLearnMore =
    "- [Burma 8.9k 0 NLD Member Tortured to Death by Myanmar Regime](https://www.irrawaddy.com/news/burma/nld-yangon-representative-tortured-death-myanmar-security-forces-sources.html) \n \n - [2021 Myanmar coup d'état - Wikipedia](https://en.wikipedia.org/wiki/2021_Myanmar_coup_d%27%C3%A9tat)";

  return (
    <div className="event-details-container">
      <div className="event-details-content">
        <div className="event-details-date-container">
          <div className="line2" />
          <svg
            className="event-details-svg"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <circle
              cx="50%"
              cy="50%"
              r="35"
              stroke="black"
              strokeWidth="18"
              fill="white"
            />
          </svg>
          <div className="event-details-date">{date}</div>
        </div>
        {/* <div className="event-details-text-container">
          <div className="event-details-title">{title}</div>
          <MarkdownPreview
            className="event-details-description"
            source={description}
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '16px',
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
        </div> */}
        <TextContainer
          title={title}
          description={description}
          references={references}
        />
      </div>
      <div className="line1" />
    </div>
  );
};

EventDetails.propTypes = {
  controllers: PropTypes.shape({
    moveNext: PropTypes.func,
  }),
  date: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  references: PropTypes.string,
};

EventDetails.defaultProps = {
  controllers: {},
  date: '',
  description:
    'Aung San founded The Communist Party of Burma and The Burmese Revolutionary Party (which later became the Socialist Party). Him and 29 other members traveled to Japan to train alongside the expanding Japanese military. ',
  title: 'The Thirty Comrades',
  references: '',
};

export default EventDetails;
