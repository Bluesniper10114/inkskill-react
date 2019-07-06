import bowser from 'bowser';

const allowed = {
  msie: '11',
};

if (!bowser.check(allowed)) {
  window.location = 'http://outdatedbrowser.com/';
}
