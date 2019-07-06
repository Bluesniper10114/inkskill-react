// @flow

export default function loadSDK(id: string, src: string): Promise<void> {
  const d = document;
  const s = 'script';
  const fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return Promise.resolve();

  const js = d.createElement(s);
  js.id = id;
  js.src = src;

  if (fjs && fjs.parentNode) {
    fjs.parentNode.insertBefore(js, fjs);
  } else {
    return Promise.reject(new Error('Can\'t insert a script tag'));
  }

  return new Promise(resolve => js.addEventListener('load', () => resolve()));
}
