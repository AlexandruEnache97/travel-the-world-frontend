import axios, { AxiosResponse } from 'axios';

type GetMethod = (url: string) => Promise<AxiosResponse<any>>;
type PostMethod = (url: string, data: any) => Promise<AxiosResponse<any>>;
type PutMethod = (url: string, data: any) => Promise<AxiosResponse<any>>;
type RemoveMethod = (url: string, data: any) => Promise<AxiosResponse<any>>;

export const get:GetMethod = async (url) => {
  try {
    const config = {
      method: 'get',
      url,
    };

    const response: AxiosResponse = await axios(url);
    // const response: AxiosResponse = await axios(config);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const post: PostMethod = async (url, data) => {
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

export const put:PutMethod = async (url, data) => {
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

export const remove: RemoveMethod = async (url, data) => {
  try {
    const response = await axios.delete(url, { data, headers: { 'Content-Type': 'application/json' }});
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
