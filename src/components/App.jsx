import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import * as API from 'services/api';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { ErrorMessage, Text } from './ErrorMessage/ErrorMessage';
export default function App() {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isShownButton, setIsShownButton] = useState(false);
  const [perPage] = useState(12);

  useEffect(() => {
    async function loadImages(searchName, page) {
      setIsLoading(true);
      setError(null);
      try {
        if (!searchName) {
          setImages([]);
          setIsEmpty(false);
          return;
        }

        const { hits, totalHits } = await API.getImages(searchName, page);
        if (!hits.length) {
          setIsEmpty(true);
          return;
        }

        setImages(prevStateImages => [...prevStateImages, ...hits]);
        setPage(page);
        setIsShownButton(page < Math.ceil(totalHits / perPage));
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError('Oops! Something went wrong! Try reloading the page!');
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadImages(searchName, page);
  }, [searchName, page, perPage]);

  const handleSearch = searchName => {
    setSearchName(searchName);
    setImages([]);
    setPage(1);
    setIsShownButton(false);
    setIsEmpty(false);
    setError(null);
  };

  const handleButtonLoadMore = () => {
    setPage(prevStatePage => prevStatePage + 1);
  };

  return (
    <Layout>
      <GlobalStyle />
      <Searchbar onSubmit={handleSearch} />
      {isEmpty && <Text>Sorry. There are no images ... </Text>}
      {isLoading && <Loader />}

      <>
        <ImageGallery items={images} />
        {isShownButton && <Button onClick={handleButtonLoadMore} />}
      </>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ToastContainer autoClose={2000} />
    </Layout>
  );
}
