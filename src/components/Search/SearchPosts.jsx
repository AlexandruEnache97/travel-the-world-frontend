import React, { useState } from 'react';

import './searchPosts.scss';

const SearchPosts = () => {
  const [searchInput, setSearchInput] = useState('');

  const searchOnChangeHandler = (e) => {
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
