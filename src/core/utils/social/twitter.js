import { getApiUrl, request } from 'core/utils/api';

const login = () => new Promise((resolve, reject) => {
  const url = getApiUrl('/auth/twitter');
  const win = window.open(url, 'twitter', 'width=530,height=340');
  const interval = setInterval(() => {
    try {
      const content = win.document.body.innerText.trim();

      if (content === 'Authorized') {
        clearInterval(interval);
        win.close();
        resolve();
      } else if (content === 'Unauthorized') {
        clearInterval(interval);
        win.close();
        reject();
      } else if (win.closed) { // TODO Make this case working
        clearInterval(interval);
        reject();
      }
    } catch (e) {} // eslint-disable-line no-empty
  }, 200);
});

export const connectAccount = () => login().then(() => request({
  url: '/auth/twitter/connect',
  method: 'POST',
})).then((url) => {
  console.log('result', url);
  return url;
});
