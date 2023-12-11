import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function RecommendationsList({ userId }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const address = localStorage.getItem('serverAddress');
      console.log("wywolanie:" + userId);
      axios.get(`${address}/recommendations/${userId}`)
        .then(response => setRecommendations(response.data))
        .catch(error => console.error('Błąd przy pobieraniu rekomendacji', error));
    
  }, [userId]);

  return (
    <div>
      <h2>Rekomendacje Filmów</h2>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>{rec.film.properties.tytul} - Rekomendacje: {rec.recommendationCount}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationsList;
