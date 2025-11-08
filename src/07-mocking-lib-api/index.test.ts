// Uncomment the code below and write your tests
import axios, { Axios } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    jest.spyOn(axios, 'create');
    jest
      .spyOn(Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve({ data: {} }));

    await throttledGetDataFromApi('posts/1');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    jest
      .spyOn(Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve({ data: {} }));

    await throttledGetDataFromApi('posts/1');
    expect(Axios.prototype.get).toHaveBeenCalledWith('posts/1');
  });

  test('should return response data', async () => {
    jest
      .spyOn(Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve({ data: {} }));

    const data = await throttledGetDataFromApi('posts/1');
    expect(data).toEqual({});
  });
});
