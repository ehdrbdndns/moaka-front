let BASE_URL: string = '';
process.env.NODE_ENV === 'development'
  ? (BASE_URL = 'http://localhost:8080')
  : (BASE_URL = 'https://moaka-server.com');

let UNSPLASH_ACCESS_KEY = 'FgFrYuDH2tBfdQTluznqWZxYSS6hjEdbMw6boBty1JY';
let UNSPLASH_URL = 'https://api.unsplash.com';

export { BASE_URL, UNSPLASH_ACCESS_KEY, UNSPLASH_URL };
