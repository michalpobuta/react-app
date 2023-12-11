import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function RateFilmModal({uID ,film, onClose }) {
  const [rating, setRating] = useState({ userId: uID, filmId: film.id, ocena: '' });

  const handleSubmit = async (event) => {
    const address = localStorage.getItem('serverAddress');
    event.preventDefault();
    try {
        console.log(uID);
      await axios.post(`${address}/addRating`, rating);
      alert('Film oceniony');
      onClose();
    } catch (error) {
      console.error('Błąd przy ocenianiu filmu', error);
    }
  };

  return (
    <div className="rateFilmModal">
      <h2>Oceń Film: {film.tytul}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={rating.ocena}
          onChange={(e) => setRating({ ...rating, ocena: e.target.value })}
          placeholder="Ocena"
        />
        <button type="submit">Oceń</button>
      </form>
      <button onClick={onClose}>Zamknij</button>
    </div>
  );
}

export default RateFilmModal;
