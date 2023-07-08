import React, { useState, useEffect } from 'react';
import './App.css';
import Modal from 'react-modal';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [genderFilter, setGenderFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=500")
      .then(response => response.json())
      .then(data => setUsers(data.results))
      .catch(error => console.log(error));
  }, []);

  const handleCardClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleGenderFilterChange = (event) => {
    setGenderFilter(event.target.value);
  };

  const generateAgeRange = (start, end) => {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  const handleAgeFilterChange = (event) => {
    const selectedAge = event.target.value;
    let startAge, endAge;
  
    if (selectedAge === "18-30") {
      startAge = 18;
      endAge = 30;
    } else if (selectedAge === "30-60") {
      startAge = 30;
      endAge = 60;
    } else if (selectedAge === "60-90") {
      startAge = 60;
      endAge = 90;
    } else {
      startAge = 0;
      endAge = 100;
    }
  
    setAgeFilter(selectedAge);
    setStartAge(startAge);
    setEndAge(endAge);
  };
  
  const [startAge, setStartAge] = useState(18);
  const [endAge, setEndAge] = useState(30);
  const ageRange = generateAgeRange(18, 100);

  const handleLocationFilterChange = (event) => {
    setLocationFilter(event.target.value);
  };

  const handleClearFilters = () => {
    setGenderFilter("");
    setAgeFilter("");
    setLocationFilter("");
  };

  const filteredUsers = users.filter(user => {
    if (genderFilter && user.gender !== genderFilter) {
      return false;
    }
    if (ageFilter && (user.dob.age < startAge || user.dob.age > endAge)) {
      return false;
    }
    if (locationFilter && user.location.country !== locationFilter) {
      return false;
    }
    return true;
  });
  
  

  const uniqueCountries = [...new Set(users.map(user => user.location.country))];

  return (
    <div className="container">
      <h1>Random Users</h1>
      <div className="filters">
        <label>
          Gender:
          <select value={genderFilter} onChange={handleGenderFilterChange}>
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Age:
          <select value={ageFilter} onChange={handleAgeFilterChange}>
          <option value="">All</option>
          <option value="18-30">18-30</option>
          <option value="30-60">30-60</option>
          <option value="60-90">60-90</option>
        </select>
      </label>

      <label>
        Location:
        <select value={locationFilter} onChange={handleLocationFilterChange}>
          <option value="">All</option>
          {uniqueCountries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </label>
      <button onClick={handleClearFilters}>Clear Filters</button>
    </div>
    <div className="card-container">
      {filteredUsers.map((user, index) => (
        <div key={index} className="card" onClick={() => handleCardClick(user)}>
          <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
          <h2>{`${user.name.first} ${user.name.last}`}</h2>
          <p>Gender: {user.gender}</p>
          <p>Age: {user.dob.age}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
      ))}
    </div>
    <Modal
      isOpen={selectedUser !== null}
      onRequestClose={handleCloseModal}
      contentLabel="User Details"
      className="modal"
    >
      {selectedUser && (
        <div>
          <h2>{`${selectedUser.name.first} ${selectedUser.name.last}`}</h2>
          <img src={selectedUser.picture.large} alt={`${selectedUser.name.first} ${selectedUser.name.last}`} />
          <p>Gender: {selectedUser.gender}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Phone: {selectedUser.phone}</p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </Modal>
  </div>
);
}

export default App;









