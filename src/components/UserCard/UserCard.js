import React from 'react';
import PropTypes from 'prop-types';
import './UserCard.css'

function UserCard({ user, onSelect, isSelected, searchQuery }) {
  const handleSelect = () => {
    onSelect(user);
  };

  const highlightMatch = text => {
    const searchQueryLower = searchQuery.toLowerCase();
    if (searchQuery && text.toLowerCase().includes(searchQueryLower)) {
      const start = text.toLowerCase().indexOf(searchQueryLower);
      const end = start + searchQuery.length;
      return (
        <>
          {text.slice(0, start)}
          <span className="highlight">{text.slice(start, end)}</span>
          {text.slice(end)}
        </>
      );
    }
    return text;
  };

  return (
    <div
      className={`user-card${isSelected ? ' selected' : ''}`}
      onClick={handleSelect}
      onKeyDown={event => {
        if (event.key === 'Enter') {
          handleSelect();
        }
      }}
      tabIndex="0"
    >
      <div className="user-id">{highlightMatch(user.id)}</div>
      <div className="user-name">{highlightMatch(user.name)}</div>
      <div className="user-address">{highlightMatch(user.address)}</div>
      {searchQuery.length>0 && (
        <strong className="user-items">{(`${searchQuery} found in items`)}</strong>
      )}
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    pincode: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default UserCard;

