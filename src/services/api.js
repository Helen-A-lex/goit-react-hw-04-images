import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '35754029-ae2c95690085c71643cf1e4c6';

export const getImages = async (searchName, page) => {
  const response = await axios.get(
    `?q=${searchName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
};
