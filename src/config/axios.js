import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';

