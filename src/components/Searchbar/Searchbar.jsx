import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Search,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchFormBbuttonLabel,
} from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';
export class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleNameChange = evt => {
    this.setState({ searchName: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.searchName.trim() === '') {
      toast.error(
        'The search string cannot be empty. Please specify your search query.',
        { theme: 'colored' }
      );
      return;
    }
    this.props.onSubmit(this.state.searchName);
    this.reset();
  };

  reset = () => {
    this.setState({
      searchName: '',
    });
  };

  render() {
    return (
      <Search className="searchbar">
        <SearchForm onSubmit={this.handleSubmit} className="form">
          <SearchFormButton type="submit">
            <ImSearch />
            <SearchFormBbuttonLabel>Search</SearchFormBbuttonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchName}
            onChange={this.handleNameChange}
          />
        </SearchForm>
      </Search>
    );
  }
}
