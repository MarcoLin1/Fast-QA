import axios from 'axios';

const appApi = axios.create({ baseURL: 'https://opentdb.com/api.php' });

export default appApi;
