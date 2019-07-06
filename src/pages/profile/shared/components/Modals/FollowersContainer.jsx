import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import Followers from './Followers';
import { selectors } from '../../state/followers';

export default compose(
  connect(selectors.getFollowersModal),
  withState('filteredList', 'setList', props => props.followers),
  withState('term', 'setTerm', ''),
  withState('role', 'setRole', ''),
  withHandlers({
    onChangeTerm: ({ setTerm }) => ({ target }) => setTerm(target.value),
    onChangeRole: ({ setRole }) => ({ target }) => setRole(Number(target.value)),
    onFilter: ({ term, role, followers, setList }) => (event) => {
      event.preventDefault();

      let filtered = followers;
      if (role) {
        filtered = filtered.filter(user => user.role === role);
      }

      if (term) {
        const query = new RegExp(term, 'gi');
        filtered = filtered.filter(user => user.name.search(query) >= 0);
      }

      setList(filtered);
    },
  }),
)(Followers);
