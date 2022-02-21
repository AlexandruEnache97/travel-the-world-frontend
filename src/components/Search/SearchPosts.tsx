import * as React from 'react';
import './searchPosts.scss';

type SearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => void;

const SearchPosts = () => {
  const [searchInput, setSearchInput] = React.useState<string>('');

  const searchOnChangeHandler: SearchOnChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchInput}
        onChange={searchOnChangeHandler}
        placeholder="Search posts/users/categories ..."
      />
    </div>
  );
};

export default SearchPosts;
