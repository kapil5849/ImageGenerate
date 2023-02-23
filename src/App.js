import React, { useState } from 'react';
import { fetchRandomImage } from './api';
import './App.css';
function App() {
  const [image, setImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  async function handleSearch(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const image = await fetchRandomImage(searchTerm);
      setImage(image);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="app-main">
      <h3>Generate an image using Pixabay API</h3>
      <form className="app-all" onSubmit={handleSearch}>
        <input
          className='app-input'
          type="text"
          placeholder="Type something to generate an image..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn" type="submit" disabled={isLoading}>
        Generate an Image
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {image && (
        <div>
          <h2>{image.tags}</h2>
          <img className='result-image' src={image.webformatURL} alt={image.tags} />
        </div>
      )}
      <h5>Developed by 💜  <a href='https://twitter.com/kapil__vaishnav'>Kapil vaishnav</a></h5>
    </div>
  );
}
export default App;