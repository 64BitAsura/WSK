import { NexusIcon } from './nexus-icon';
import { newSpecPage } from '@stencil/core/testing';
import { Build } from '@stencil/core';

export const setupIntersectionObserverMock = ({
  root = null,
  rootMargin = '',
  thresholds = [],
  disconnect = () => null,
  observe = () => null,
  takeRecords = () => [],
  unobserve = () => null
} = {}): void => {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | null = root;
    readonly rootMargin: string = rootMargin;
    readonly thresholds: ReadonlyArray<number> = thresholds;
    disconnect: () => void = disconnect;
    observe: () => void = observe;
    takeRecords: () => IntersectionObserverEntry[] = takeRecords;
    unobserve: () => void = unobserve;
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver
  });

  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver
  });
};

const declrComp = (htmlString: string) => {
  const page = newSpecPage({
    components: [NexusIcon],
    html: htmlString
  });

  return page;
};

const defPropFetch = (fetchMock: any) => {
  Object.defineProperty(global, 'fetch', {
    value: fetchMock,
    writable: true
  });
};
describe('nexus-icon', () => {
  beforeEach(() => setupIntersectionObserverMock());

  it('should contain class', async () => {
    const page = await declrComp(`<nexus-icon></nexus-icon>`);
    expect(page.root).toHaveClass('nexus-icon');
    page.root.remove();
  });

  it('should return file contents', async () => {
    const fetchMock = jest.fn().mockImplementation(() =>
      Promise.resolve({
        text: () => null
      })
    );

    Object.defineProperty(Build, 'isBrowser', {
      get: jest.fn(() => true)
    });

    defPropFetch(fetchMock);

    await declrComp(`<nexus-icon src="./foo.svg"></nexus-icon>`);
    expect(fetchMock).toHaveBeenCalledTimes(0);
  });

  it('should render direct svg contents', async () => {
    const page = await declrComp(`<nexus-icon content="<svg></svg>"></nexus-icon>`);
    expect(page.root.innerHTML).toBe('<svg></svg>');
    page.root.remove();
  });

  it('should catch errors for incorrect path', async () => {
    const fetchMock = jest.fn().mockImplementation(() => Promise.reject(new Error(`nexus icon mock fetch error`)));

    defPropFetch(fetchMock);
    await declrComp(`<nexus-icon src="./foo.svg"></nexus-icon>`);
    expect(fetchMock).toHaveBeenCalledTimes(0);
  });

  it('should render img upon setting the type as "img"', async () => {
    const page = await declrComp(`<nexus-icon type="img" src="./foo"></nexus-icon>`);
    expect(page.root.innerHTML).toBe('<img src="./foo" alt="">');
    page.root.remove();
  });
});
