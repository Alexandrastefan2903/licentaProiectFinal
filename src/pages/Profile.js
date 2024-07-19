import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = ({ user }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      axios.get(`http://localhost:5000/auth/get-results/${user.email}`)
        .then(response => {
          console.log(response.data.results); 
          setResults(response.data.results);
        })
        .catch(error => {
          console.error('Error fetching results:', error);
        });
    }
  }, [user]);

  const getSpotifyPlaylist = (result) => {
    const playlists = {
      'D': 'https://open.spotify.com/playlist/2Iv7Cioot7V73UfgPJAPq8?si=bee19fa563374bc6',
      'I': 'https://open.spotify.com/playlist/12yaG7vmVWKfmfitapD9F1?si=8f660ae3e5a04196',
      'S': 'https://open.spotify.com/playlist/3CFzQGEvyEUmdsLzoyqBRE?si=a6e0c18329804394',
      'C': 'https://open.spotify.com/playlist/38sy2QgZ34sx3EG690FW9I?si=edb62efdd73b4674',
    };
    return playlists[result] || null;
  };

  const getPersonalityType = (result) => {
    const types = {
      'D': 'Dominance',
      'I': 'Influence',
      'S': 'Steadiness',
      'C': 'Conscientiousness',
    };
    return types[result] || 'Unknown';
  };

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      <h2>Quiz Results</h2>
      <ul className="results-list">
        {results.length > 0 ? results.map((result, index) => (
          <li key={index}>
            <span>{new Date(result.timestamp).toLocaleString()}:</span> 
            <span> {getPersonalityType(result.result)} ({result.result})</span>
            {getSpotifyPlaylist(result.result) && (
              <a
                href={getSpotifyPlaylist(result.result)}
                target="_blank"
                rel="noopener noreferrer"
                className="playlist-button"
              >
                Listen to your personality playlist
              </a>
            )}
          </li>
        )) : <p>No results found</p>}
      </ul>
    </div>
  );
};

export default Profile;
