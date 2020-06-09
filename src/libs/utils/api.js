
import axios from 'axios';

async function callApi(method, url, data) {
  const completeUrl = process.env.REACT_APP_BASE_URL + url;
  try {
    const response = await axios({
      method,
      url: completeUrl,
      data,
    });
    return response.data;
  } catch (error) {
    return { message: error.message, status: 'error'};
  }
}

export default callApi;
