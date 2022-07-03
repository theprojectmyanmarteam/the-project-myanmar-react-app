import React from 'react';
import PropTypes from 'prop-types';
import './EventDetails.css';
// import MarkdownPreview from '@uiw/react-markdown-preview';
import TextContainer from '../utils/text-container/TextContainer';

// eslint-disable-next-line no-unused-vars
const EventDetails = React.forwardRef(
  ({ content, hideTitle, hideDate }, ref) => {
    // eslint-disable-next-line no-unused-vars
    const example =
      'The second Anglo Burmese war was initiated by the British occupation of the Port of Matarban, a Burmese territory off of the coast of Mawlamyine. Tensions were still high between [the Company](https://en.wikipedia.org/wiki/East_India_Company) and the Burmese following the first war. The misrepresentation of Burmese affairs to the country back in Britain was assigned as the cause of the decision to invade and annex Burma. The war ended in a year without any treaties ever being signed after the Company sacked many of the most sacred pagodas. \n \n The British and Burmese forces had been butting heads all across their newly defined borders throughout the first half of the century. Various ethnic groups used the instability as the opportunity to fight for their autonomy from the Bamars during this period. British historians depicted the fragmented ethnic groups as a reason as to why the people within the region needed the Empire to install “peace”, “civility”, and “order”. However, these Western-centric accounts usually left out the pre-existing historical and cultural norms, intricate judicial systems, and how colonialism destroyed these highly intricate, self-sufficient systems to be replaced by ones that only served the British Empire.';
    // eslint-disable-next-line no-unused-vars
    const exampleLearnMore =
      "- [Burma 8.9k 0 NLD Member Tortured to Death by Myanmar Regime](https://www.irrawaddy.com/news/burma/nld-yangon-representative-tortured-death-myanmar-security-forces-sources.html) \n \n - [2021 Myanmar coup d'état - Wikipedia](https://en.wikipedia.org/wiki/2021_Myanmar_coup_d%27%C3%A9tat)";

  return (
    <div ref={ref} className="event-details-container">
      <div className="event-details-content">
        {!hideDate && (
            <div className="event-details-date-container grey-bottom-border">
              <div className="event-details-date">{content.date}</div>
            </div>
        )}
        <TextContainer
          title={title}
          description={description}
          references={references}
        />
      </div>
    </div>
    );
  }
);

EventDetails.propTypes = {
  controllers: PropTypes.shape({
    moveNext: PropTypes.func,
  }),
  content: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    content: PropTypes.string,
    learnMore: PropTypes.string,
  }),
  hideTitle: PropTypes.bool,
  hideDate: PropTypes.bool,
};

EventDetails.defaultProps = {
  controllers: {},
  content: {
    date: '',
    content:
      'Aung San founded The Communist Party of Burma and The Burmese Revolutionary Party (which later became the Socialist Party). Him and 29 other members traveled to Japan to train alongside the expanding Japanese military. ',
    title: 'The Thirty Comrades',
    learnMore: '',
  },
  hideTitle: false,
  hideDate: false,
};

export default EventDetails;
