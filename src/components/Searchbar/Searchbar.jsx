import { useState } from 'react';
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

export default function Searchbar (){
 
const [searchName, setSearchName] = useState("");

 const  handleNameChange = evt => {
   setSearchName(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchName.trim() === '') {
      toast.error(
        'The search string cannot be empty. Please specify your search query.',
        { theme: 'colored' }
      );
      return;
    }
    this.props.onSubmit(this.state.searchName);
    reset();
  };

  const reset = (searchName) => {
    // this.setState({
    //   searchName: '',
    // });
    setSearchName(searchName)
  };

 
    return (
      <Search className="searchbar">
        <SearchForm onSubmit={handleSubmit} className="form">
          <SearchFormButton type="submit">
            <ImSearch />
            <SearchFormBbuttonLabel>Search</SearchFormBbuttonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchName}
            onChange={handleNameChange}
          />
        </SearchForm>
      </Search>
    );
  }

