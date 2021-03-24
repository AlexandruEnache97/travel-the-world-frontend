import axios from 'axios';

export const get = async (url) => {
  try {
    const config = {
      method: 'get',
      url,
    };

    const response = await axios(config);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const post = async (url, data) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(url, data, config);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const put = async (url, data) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.put(url, data, config);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

// export const remove = async (url, data) => {
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };

//     const response = await axios.delete(url, { data, config });
//     return response;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };
