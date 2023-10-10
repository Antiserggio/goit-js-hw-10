import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_l8q1hHZN7kRmlE1j4rWT4Z0PVxJ1KSeoyJrKxgefBus4V1IIMugzLuiVpL4mj6Xm';

const URL = 'https://api.thecatapi.com/v1';

const API_KEY = axios.defaults.headers.common['x-api-key'];

export function fetchBreeds() {
  return axios.get(`${URL}/breeds?api_key=${API_KEY}`).then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.data[0];
    });
}
