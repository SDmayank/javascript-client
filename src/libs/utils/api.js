
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
    return { status: 'error', message: 'This is a error message' };
  }
}

export default callApi;
