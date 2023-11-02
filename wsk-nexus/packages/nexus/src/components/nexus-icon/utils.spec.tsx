import fetchIcon from './utils';

describe('nexus-icon-cache-test', () => {
  it('test cached icons', async () => {
    const fetchMock = jest.fn().mockImplementation(() => Promise.resolve('Some date in here.'));
    await fetchIcon({
      icon: 'foo',
      iconPath: './foo.svg'
    }).then((resp) => {
      expect(resp).toBe('Not Found');
      expect(fetchMock).toHaveBeenCalledTimes(0);
    });
  });

  it('test already cached icons', async () => {
    const fetchMock = jest.fn().mockImplementation(() => Promise.resolve('./foo.svg'));
    await fetchIcon({
      icon: 'foo',
      iconPath: './foo.svg'
    }).then((resp) => {
      expect(resp).toBe('Not Found');
      expect(fetchMock).toHaveBeenCalledTimes(0);
    });
  });

  it('test cached icons throws exception', async () => {
    const fetchMock = jest.fn().mockImplementation(() => {
      throw new Error('Error message');
    });

    Object.defineProperty(global, 'fetch', {
      value: fetchMock,
      writable: true
    });
    await fetchIcon({
      icon: 'foo',
      iconPath: './foo.svg'
    }).then((resp) => {
      expect(resp).toBe('Not Found');
      expect(fetchMock).toHaveBeenCalledTimes(0);
    });
  });
});
