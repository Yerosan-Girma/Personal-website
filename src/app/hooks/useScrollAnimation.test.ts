import { renderHook } from '@testing-library/react';
import { useScrollAnimation } from './useScrollAnimation';

describe('useScrollAnimation', () => {
  let mockIntersectionObserver: jest.Mock;
  let mockObserve: jest.Mock;
  let mockUnobserve: jest.Mock;
  let mockDisconnect: jest.Mock;

  beforeEach(() => {
    mockObserve = jest.fn();
    mockUnobserve = jest.fn();
    mockDisconnect = jest.fn();

    mockIntersectionObserver = jest.fn(function (
      callback: IntersectionObserverCallback
    ) {
      // Store callback for later triggering
      (this as any).callback = callback;
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
        root: null,
        rootMargin: '',
        thresholds: [],
        takeRecords: () => [],
      };
    });

    global.IntersectionObserver = mockIntersectionObserver as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return ref and isInView initially false', () => {
    const { result } = renderHook(() => useScrollAnimation());

    expect(result.current.ref).toBeDefined();
    expect(result.current.ref.current).toBeNull();
    expect(result.current.isInView).toBe(false);
  });

  it('should create IntersectionObserver with default options', () => {
    renderHook(() => useScrollAnimation());

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );
  });

  it('should create IntersectionObserver with custom options', () => {
    renderHook(() =>
      useScrollAnimation({
        threshold: 0.5,
        rootMargin: '50px',
      })
    );

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.5,
        rootMargin: '50px',
      }
    );
  });

  it('should observe element when ref is set', () => {
    const { result } = renderHook(() => useScrollAnimation());

    const mockElement = document.createElement('div');
    (result.current.ref as any).current = mockElement;

    // Re-render to trigger useEffect
    result.current.ref.current = mockElement;

    expect(mockObserve).toHaveBeenCalled();
  });

  it('should set isInView to true when element intersects', () => {
    const { result } = renderHook(() => useScrollAnimation());

    const mockElement = document.createElement('div');
    (result.current.ref as any).current = mockElement;

    // Simulate intersection
    const observerInstance = mockIntersectionObserver.mock.results[0].value;
    const callback = (mockIntersectionObserver as any).mock.instances[0]
      .callback;

    const entries: IntersectionObserverEntry[] = [
      {
        isIntersecting: true,
        target: mockElement,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRatio: 0.5,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        time: Date.now(),
      },
    ];

    callback(entries, observerInstance);

    expect(result.current.isInView).toBe(true);
  });

  it('should unobserve after element intersects (one-time trigger)', () => {
    const { result } = renderHook(() => useScrollAnimation());

    const mockElement = document.createElement('div');
    (result.current.ref as any).current = mockElement;

    // Simulate intersection
    const observerInstance = mockIntersectionObserver.mock.results[0].value;
    const callback = (mockIntersectionObserver as any).mock.instances[0]
      .callback;

    const entries: IntersectionObserverEntry[] = [
      {
        isIntersecting: true,
        target: mockElement,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRatio: 0.5,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        time: Date.now(),
      },
    ];

    callback(entries, observerInstance);

    expect(mockUnobserve).toHaveBeenCalledWith(mockElement);
  });

  it('should disconnect observer on unmount', () => {
    const { unmount } = renderHook(() => useScrollAnimation());

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should not trigger when element is not intersecting', () => {
    const { result } = renderHook(() => useScrollAnimation());

    const mockElement = document.createElement('div');
    (result.current.ref as any).current = mockElement;

    // Simulate no intersection
    const observerInstance = mockIntersectionObserver.mock.results[0].value;
    const callback = (mockIntersectionObserver as any).mock.instances[0]
      .callback;

    const entries: IntersectionObserverEntry[] = [
      {
        isIntersecting: false,
        target: mockElement,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRatio: 0,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        time: Date.now(),
      },
    ];

    callback(entries, observerInstance);

    expect(result.current.isInView).toBe(false);
    expect(mockUnobserve).not.toHaveBeenCalled();
  });
});
