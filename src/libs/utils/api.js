import axios from 'axios';

async function callApi(method, url, data) {
  const completeUrl = process.env.REACT_APP_BASE_URL + url;
  const token = localStorage.getItem('Token')
  console.log('toke,', token)
  try {
    const response = await axios({
      method,
      url: completeUrl,
      data: { ...data },
      params: { ...data },
      headers: {
        authorization: localStorage.getItem('Token'),
      },
    });

    return response.data;
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

export default callApi;
