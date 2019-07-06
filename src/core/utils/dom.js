// @flow

const getBody = (): HTMLElement => document.getElementsByTagName('body')[0];
let prevLocation = window.location.pathname;

export const toggleBodyClass = (className: string, flag: boolean = false) => {
  const body = getBody();
  const classList = new Set(body.classList);

  if (!flag) {
    classList.delete(className);
  } else {
    classList.add((className));
  }

  body.className = Array.from(classList).join(' ');
};

export const trackBodyClicks = (wantedClassName: string, callback: Function) => {
  const listener = ({ target }) => {
    if (!target.classList.contains(wantedClassName)) {
      callback();
      window.removeEventListener('click', listener);
    }
  };

  setTimeout(() => window.addEventListener('click', listener));
};

export const smoothScroll = (duration: number, element: HTMLElement, to: number = 0) => {
  const timeToEnd = Date.now() + duration;
  const pixelsToScroll = element.scrollTop;

  const interval = setInterval(() => {
    const time = Date.now();
    const timeDiff = timeToEnd - time;

    if (timeDiff <= 0) {
      clearInterval(interval);
      element.scrollTop = to; // eslint-disable-line
    } else {
      element.scrollTop = timeDiff / duration * pixelsToScroll; // eslint-disable-line
    }
  });
};

const isProfileTab = (path) => {
  const tabs = ['', '/images', '/video', '/reviews', '/questions'];
  const baseReg = '/ink/[a-zA-Z0-9.]+';

  return tabs.reduce((switched, tab) => {
    if (switched) return switched;

    const reg = new RegExp(`${baseReg}${tab}`);
    return reg.test(path);
  }, false);
};

const hasTabSwitched = (path) => {
  const isTab = isProfileTab(path);
  const prevIsTab = isProfileTab(prevLocation);

  return isTab && prevIsTab;
};

export const scrollToTop = () => {
  const path = window.location.pathname;
  const switched = hasTabSwitched(path);
  prevLocation = path;

  if (document.body && !switched) {
    document.body.scrollTop = 0;
  }
};
