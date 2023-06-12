import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import * as API from 'services/api';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { ErrorMessage, Text } from './ErrorMessage/ErrorMessage';
export class App extends Component {
  state = {
    searchName: '',
    images: [],
    isLoading: false,
    error: null,
    page: 1,
    isEmpty: false,
    isShownButton: false,
    perPage: 12,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchName, page } = this.state;

    if (prevState.searchName !== searchName || prevState.page !== page) {
      this.loadImages(searchName, page);
    }
  }

  loadImages = async (searchName, page) => {
    this.setState({ isLoading: true, error: null });
    try {
      const { hits, totalHits } = await API.getImages(searchName, page);
      if (!hits.length) {
        this.setState({ isEmpty: true });
        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        page,
        isShownButton: page < Math.ceil(totalHits / this.state.perPage),
      }));
    } catch (error) {
      if (error.code !== 'ERR_CANCELED') {
        this.setState({
          error: 'Oops! Something went wrong! Try reloading the page!',
        });
      }
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = searchName => {
    this.setState({
      searchName,
      images: [],
      page: 1,
      isShownButton: false,
      isEmpty: false,
      error: null,
    });
  };

  handleButtonLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, error, isEmpty, isShownButton } = this.state;
    return (
      <Layout>
        <GlobalStyle />
        <Searchbar onSubmit={this.handleSearch} />
        {isEmpty && <Text>Sorry. There are no images ... </Text>}
        {isLoading && <Loader />}

        <>
          <ImageGallery items={images} />
          {isShownButton && <Button onClick={this.handleButtonLoadMore} />}
        </>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ToastContainer autoClose={2000} />
      </Layout>
    );
  }
}
