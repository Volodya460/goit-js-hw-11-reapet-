import axios from 'axios';
const API_KEY = '33272220-12aa76911a3763f30e85ef70a';
const BASE_URL = `https://pixabay.com/api/`;
const searchParams = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
});

export default class ImageIp {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    let response = await axios(
      `${BASE_URL}?${searchParams}&q=${this.searchQuery}&page=${this.page}`
    );

    return response.data;
  }

  incramentPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// async function fetchImages() {
//   let response = await axios(`${BASE_URL}?${searchParams}&q=cat&page=1`);
//   console.log(response.data);
//   return response.data;
// }

// export { fetchImages };
