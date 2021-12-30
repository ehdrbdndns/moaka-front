import axios from 'axios';
import { UNSPLASH_ACCESS_KEY, UNSPLASH_URL } from '../utils';

const searchUnsplashImg = async (query: string) => {
  await axios
    .get(UNSPLASH_URL + '/search/photos', {
      params: {
        client_id: UNSPLASH_ACCESS_KEY,
        query,
        lang: 'ko',
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error.response);
    });
};

export { searchUnsplashImg };
