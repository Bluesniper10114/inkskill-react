// @flow

import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { lifecycle, withHandlers } from 'recompose';
import { debounce } from 'lodash';
import loading from 'core/utils/loading';
import { withModal } from 'core/modules/modal';
import { createSelector } from 'reselect';
import { getList, fetch as fetchList } from '../shared/state/list';
import { getFeatured, fetchFeatured } from '../shared/state/featured';
import { getPopular, fetchPopular } from '../shared/state/popular';
import SubscribeNewsletterMutation from '../shared/graphql/SubscribeNewsletter.graphql';
import Index from './index';

const withLoader = loading(({ list, featured, popular }) =>
  (!list.length || !featured.length || !popular.length))(Index);

export default compose(
  graphql(SubscribeNewsletterMutation, {
    props: ({ mutate }) => ({
      subscribe: ({ email }) => mutate({
        variables: { email },
      }),
    }),
  }),
  withModal('subscribe', 'onSubscribe'),
  connect(createSelector(
    getList,
    getFeatured,
    getPopular,
    (list, featured, popular) => ({
      list,
      featured,
      popular,
    })), { fetchList, fetchFeatured, fetchPopular }),
  withHandlers({
    handleScroll: ({ onSubscribe, subscribe }) => debounce(() => { // lodash debounce method.
      const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        if (!localStorage.getItem('subscribed')) {
          // setTimeout(function () {
          //   onSubscribe({
          //     handleConfirm: (data) => {
          //       subscribe(data);
          //       localStorage.setItem('subscribed', JSON.stringify(true));
          //     },
          //   });
          // }, 300)
        }
      }
    }, 0),
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchList();
      this.props.fetchFeatured();
      this.props.fetchPopular();
      window.addEventListener('scroll', this.props.handleScroll);

      let script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/the-creature/gallery/index.min-1.0.1v.js';
      // script.src = 'http://localhost/index.min.js';
      script.async = true;
      document.body.appendChild(script);
    },
    componentWillUnmount() {
      window.removeEventListener('scroll', this.props.handleScroll);
    },
  })
)(withLoader);
