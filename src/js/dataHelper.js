/**
 * Extracts the list of period data from the raw data in order
 * @param {Object[]} rawData - data received from api
 * @returns {Object[]} list of PeriodObjects + dates
 * [
 *   {
 *      name: "periodName",
 *      description: "periodDescription",
 *      start:  "periodStartDate",
 *      end: "periodEndDate"
 *      (+)dates: [EventObject{}, EventObject{}]
 *   }
 * ]
 */
const extractPeriods = (rawData) => {
  return rawData.data;
};

/**
 * Extracts the list of events from the raw data ignoring period in order
 * @param {Object[]} rawData - data received from api
 * @returns {Object[]} list of EventObjects
 * [
 *   {
 *      date: "eventDate"
 *      title: "eventTitle"
 *      content: "eventContent"
 *      learnMore: "eventLearnMore"
 *   }
 * ]
 */
const extractEvents = (rawData) => {
  return rawData.data.map((period) => period.dates).flat();
};

/**
 * Extracts list of timeline objects from the raw data in order
 * @param {Object[]} rawData - data received from api
 * @returns {Object[]} list of TimelineObjects
 * [
 *   {
 *     type: "PERIOD" or "EVENT"
 *     content: [EventObjects{} or PeriodObjects{}]
 *   }
 * ]
 */
const extractTimeline = (rawData) => {
  return rawData.data.flatMap((period) => {
    const periodObject = {
      type: 'PERIOD',
      content: {
        name: period.name,
        description: period.description,
        start: period.start,
        end: period.end,
      },
    };
    const eventObjectList = period.dates.map((event) => ({
      type: 'EVENT',
      content: event,
    }));
    return [periodObject, ...eventObjectList];
  });
};

export { extractPeriods, extractEvents, extractTimeline };
