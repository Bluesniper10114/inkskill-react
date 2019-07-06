import moment from 'moment';

// eslint-disable-next-line
export const timeAgo = isoDate => moment(isoDate).utc().fromNow();
export const timeAgoShort = (isoDate) => {
  const diff = Date.now() - new Date(isoDate).getTime();
  const duration = moment.duration(diff);

  if (duration.years()) {
    return `${duration.years()}y`;
  } else if (duration.months()) {
    return `${duration.months()}mo`;
  } else if (duration.days()) {
    return `${duration.days()}d`;
  } else if (duration.hours()) {
    return `${duration.hours()}h`;
  } else if (duration.minutes()) {
    return `${duration.minutes()}m`;
  }

  return 'now';
};
export const simpleDate = date =>
  (moment(Number.isInteger(date) ? date * 1000 : date)).format('DD MMM YYYY');
