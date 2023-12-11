import React, { useState, useEffect } from 'react';
import AddUserModal from './Components/AddUserModal';
import AddFilmModal from './Components/AddFilmModal';
import RateFilmModal from './Components/RateFilmModal';
import FilmList from './Components/FilmList';
import RecommendationsList from './Components/RecommendationsList';
import axios from 'axios';
import './App.css';
import Graph from './Components/Graph';

function App() {
  const [films, setFilms] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(0);
  const [showAddUser, setShowAddUser] = useState(true);
  const [showAddFilm, setShowAddFilm] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);

  localStorage.setItem('serverAddress', 'https://projekt-co.vercel.app');
  const address = localStorage.getItem('serverAddress');

  useEffect(() => {
    // Załaduj filmy i użytkowników
    axios.get(`${address}/getAllFilms`).then(res => setFilms(res.data));
    axios.get(`${address}/getAllUsers`).then(res => setUsers(res.data));
  }, []);

  const handleSelectUser = (userId) => {
    setCurrentUser(parseInt(userId));
  };

  return (
    <div className="App">
      <button onClick={() => {setShowAddUser(true); setShowAddFilm(false)}}>Dodaj Użytkownika</button>
      <button onClick={() => {setShowAddFilm(true); setShowAddUser(false)}}>Dodaj Film</button>

      {showAddUser && <AddUserModal onClose={() => setShowAddUser(false)} />}
      {showAddFilm && <AddFilmModal onClose={() => setShowAddFilm(false)} />}

      <div>
        Wybierz użytkownika: 
        <select onChange={(e) => handleSelectUser(e.target.value)} value={currentUser}>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.nazwa}</option>
          ))}
        </select>
      </div>

      <FilmList films={films} onFilmSelect={setSelectedFilm} />

      {selectedFilm && <RateFilmModal uID={currentUser} film={selectedFilm} onClose={() => setSelectedFilm(null)} />}

      <RecommendationsList userId={currentUser} />
      <Graph/>
    </div>
  );
}

export default App;
