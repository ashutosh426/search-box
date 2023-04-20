import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserCard from '../UserCard/UserCard';
import './UserList.css'

function UserList({ users, searchQuery }) {
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setSelectedUser(null);
  }, [searchQuery]);

  const handleUserSelect = user => {
    setSelectedUser(user);
  };

  const handleKeyDown = event => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const index = users.indexOf(selectedUser) - 1;
      if (index >= 0) {
        setSelectedUser(users[index]);
        scrollToSelectedUser();
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const index = users.indexOf(selectedUser) + 1;
      if (index < users.length) {
        setSelectedUser(users[index]);
        scrollToSelectedUser();
      }
    }
  };

  const scrollToSelectedUser = () => {
    const selectedUserCard = document.querySelector('.user-card.selected');
    if (selectedUserCard) {
      selectedUserCard.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredUsers = users.filter(user => {
    const searchQueryLower = searchQuery.toLowerCase();
    return (
      user.id.toLowerCase().includes(searchQueryLower) ||
      user.name.toLowerCase().includes(searchQueryLower) ||
      user.address.toLowerCase().includes(searchQueryLower) ||
      user.pincode.toLowerCase().includes(searchQueryLower) ||
      user.items.some(item => item.toLowerCase().includes(searchQueryLower))
    );
  });

  return (
    <div className="user-list" onKeyDown={handleKeyDown} tabIndex="0">
      {searchQuery.length>0 ?filteredUsers.length > 0 ? (
        filteredUsers.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onSelect={handleUserSelect}
            isSelected={selectedUser && selectedUser.id === user.id}
            searchQuery={searchQuery}
          />
        ))
      ) : (
        <div className="user-card empty-card">No users found.</div>
      ): ""}
    </div>
  );
}

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      pincode: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default UserList;
