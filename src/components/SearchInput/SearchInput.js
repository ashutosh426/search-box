import React from 'react';
import PropTypes from 'prop-types';
import './SearchInput.css'

function SearchInput({ value, onChange }) {
  return (
    <div className="search-input">
      <input  className='search-input' type="text" placeholder="Search users by ID, name and address..." value={value} onChange={onChange} />
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchInput;
