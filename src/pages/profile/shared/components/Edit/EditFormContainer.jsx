import { form } from 'core/modules/form';
import EditForm from './EditForm';

export default form({
  form: 'edit_profile',
  data: ({ profile }) => profile,
  autoUpdate: true,
  rules: {
    name: ['required', 'length:3,30'],
    urls: {
      web: ['externalUrl'],
    },
  },
})(EditForm);

