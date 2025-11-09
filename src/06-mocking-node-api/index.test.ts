// Uncomment the code below and write your tests
import path from 'path';
import { doStuffByTimeout, readFileAsynchronously, doStuffByInterval } from '.';
import fs from 'fs';
import promises from 'fs/promises';

jest.mock('fs/promises');
jest.mock('fs');

describe('doStuffByTimeout', () => {
  const callback = jest.fn();
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 1000);
    expect(setTimeout).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  const callback = jest.fn();
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 1000);
    expect(setInterval).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    jest.advanceTimersByTime(5000);
    doStuffByInterval(callback, 1000);
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously('test.txt');
    expect(joinSpy).toHaveBeenCalledWith(__dirname, 'test.txt');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(await readFileAsynchronously('')).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(promises, 'readFile')
      .mockResolvedValue(Buffer.from('test content'));
    expect(await readFileAsynchronously('test.txt')).toBe('test content');
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
