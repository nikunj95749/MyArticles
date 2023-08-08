export const BASE_URL = 'https://api.realworld.io/api/';
export const POST_BASE_URL = 'https://jsonplaceholder.typicode.com/';

const API = {
  /** AUTH **/
  LOG_IN: BASE_URL + '/users/login',
  GET_ARTICLE: POST_BASE_URL + 'posts?_limit=20',
  ARTICLE: POST_BASE_URL + 'posts',
};

export default API;
