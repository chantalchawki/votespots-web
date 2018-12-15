import axios from 'axios';

axios.defaults.baseURL = process.env.SERVER_URL || 'http://localhost:3000';

