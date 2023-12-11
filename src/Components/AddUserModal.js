import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function AddUserModal({ onClose }) {
  const [user, setUser] = useState({ nazwa: '', email: '' });
  const [errors, setErrors] = useState({});
  const address = localStorage.getItem('serverAddress');
  const validate = (user) => {
    let validationErrors = {};

    if (!user.nazwa.trim()) {
      validationErrors.nazwa = 'Nazwa jest wymagana';
    }
    if (!user.email) {
      validationErrors.email = 'Email jest wymagany';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      validationErrors.email = 'Email jest nieprawidłowy';
    }
    // Dodaj więcej reguł walidacji według potrzeb

    return validationErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(user);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post(`${address}/addUser`, user);
        alert('Użytkownik dodany');
        onClose();
      } catch (error) {
        console.error('Błąd przy dodawaniu użytkownika', error);
      }
    }
  };

  return (
    <div className="userModal">
      <h2>Dodaj Użytkownika</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={user.nazwa}
          onChange={(e) => setUser({ ...user, nazwa: e.target.value })}
          placeholder="Nazwa"
        />
        {errors.nazwa && <div className="error">{errors.nazwa}</div>}

        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        {errors.email && <div className="error">{errors.email}</div>}

        <button type="submit">Dodaj</button>
      </form>
      <button onClick={onClose}>Zamknij</button>
    </div>
  );
}

export default AddUserModal;
