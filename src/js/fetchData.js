const THE_PROJECT_MYANMAR_SERVICE = process.env.REACT_APP_BACKEND_API_BASE_URL;
const API_SECRET = process.env.REACT_APP_BACKEND_API_SECRET;

/**
 * Get History Timeline Data
 */
const getHistoryData = async () => {
  const response = await fetch(
    `${THE_PROJECT_MYANMAR_SERVICE}/sections?title=The%20History%20Timeline`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apiSecret: API_SECRET,
      },
    }
  );
  return response.json();
};

/**
 * Get Coup Timeline Data
 */
const getCoupData = async () => {
  const response = await fetch(
    `${THE_PROJECT_MYANMAR_SERVICE}/sections?title=The%20Coup%20Timeline`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apiSecret: API_SECRET,
      },
    }
  );
  return response.json();
};

/**
 * Post  Analytics
 */
const postAnalytics = async () => {
  const response = await fetch(`${THE_PROJECT_MYANMAR_SERVICE}/analytics`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apiSecret: API_SECRET,
    },
  });
  return response.json();
};

export { getHistoryData, getCoupData, postAnalytics };
