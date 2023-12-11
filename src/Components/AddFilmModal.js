import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function AddFilmModal({ onClose }) {
  const [film, setFilm] = useState({ tytul: '', opis: '', gatunek: '' });
  const [errors, setErrors] = useState({});
  const address = localStorage.getItem('serverAddress');
  const validate = (film) => {
    let validationErrors = {};
    
    if (!film.tytul.trim()) {
      validationErrors.tytul = 'Tytuł jest wymagany';
    }
    if (!film.opis.trim()) {
      validationErrors.opis = 'Opis jest wymagany';
    }
    if (!film.gatunek.trim()) {
      validationErrors.gatunek = 'Gatunek jest wymagany';
    }

    return validationErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(film);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post(`${address}/addFilm`, film);
        alert('Film dodany');
        onClose();
      } catch (error) {
        console.error('Błąd przy dodawaniu filmu', error);
      }
    }
  };

  return (
    <div className="filmModal">
      <h2>Dodaj Film</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={film.tytul}
          onChange={(e) => setFilm({ ...film, tytul: e.target.value })}
          placeholder="Tytuł"
        />
        {errors.tytul && <div className="error">{errors.tytul}</div>}

        <input
          type="text"
          value={film.opis}
          onChange={(e) => setFilm({ ...film, opis: e.target.value })}
          placeholder="Opis"
        />
        {errors.opis && <div className="error">{errors.opis}</div>}

        <input
          type="text"
          value={film.gatunek}
          onChange={(e) => setFilm({ ...film, gatunek: e.target.value })}
          placeholder="Gatunek"
        />
        {errors.gatunek && <div className="error">{errors.gatunek}</div>}

        <button type="submit">Dodaj</button>
      </form>
      <button onClick={onClose}>Zamknij</button>
    </div>
  );
}

export default AddFilmModal;
