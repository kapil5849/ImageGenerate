import axios from 'axios';
const API_KEY = '33851861-7ef0042c290a1534053510dd1';
export async function fetchRandomImage(searchTerm) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}&per_page=100`
  );
  const images = response.data.hits;
  if (images.length === 0) {
    throw new Error(`No images found for search term: ${searchTerm}`);
  }
  return images[Math.floor(Math.random() * images.length)];
}