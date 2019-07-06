import axios from 'axios';
import { API_KEY, API_BASE_URL } from './env';

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['AUTH-KEY'] = API_KEY;
axios.defaults.headers.post['Content-Type'] = 'application/json';
