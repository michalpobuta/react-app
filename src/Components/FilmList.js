import React from 'react';
import './styles.css';

function FilmList({ films, onFilmSelect }) {
  return (
    <div className='filmList'>
      <h2>Lista Filmów</h2>
      <ul>
        {films.map(film => (
          <li key={film.tytul} onClick={() => onFilmSelect(film)}>
            {film.tytul}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilmList;
