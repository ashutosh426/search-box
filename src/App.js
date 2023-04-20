import React, { useState, useEffect } from 'react';
import './App.css';
import SearchInput from './components/SearchInput/SearchInput';
import UserList from './components/UsersList/UserList';


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  
// Fetch Data from Api 
  useEffect(() => {
    fetch('http://www.mocky.io/v2/5ba8efb23100007200c2750c')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.log(error));
  }, []);

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="app">
      <SearchInput value={searchQuery} onChange={handleSearch} />
      <UserList users={users} searchQuery={searchQuery} />
    </div>
  );
}

export default App;
