let BASE_URL: string = '';
process.env.NODE_ENV === 'development'
  ? (BASE_URL = 'http://localhost:8080')
  : (BASE_URL = 'https://moaka-server.com');

export { BASE_URL };
