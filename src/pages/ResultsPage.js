import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CelebritiesCarousel from './CelebritiesCarousel'; 
import './ResultsPage.css';

const celebrityImages = {
  D: [
    { name: 'Beyoncé', image: require('../assets/celebrities/beyonce.png') },
    { name: 'Michael Jordan', image: require('../assets/celebrities/michaelJordan.png') },
    { name: 'Jennifer Lopez', image: require('../assets/celebrities/jenniferLopez.png') },
    { name: 'Amy Schumer', image: require('../assets/celebrities/amySchumer.jpg') },
    { name: 'Meryl Streep', image: require('../assets/celebrities/merylStreep.png') },
    { name: 'Dwayne Johnson', image: require('../assets/celebrities/dwayneJohnson.png') },
    { name: 'Angelina Jolie', image: require('../assets/celebrities/angelinaJolie.png') },
  ],
  I: [
    { name: 'Dolly Parton', image: require('../assets/celebrities/dollyParton.png') },
    { name: 'Will Smith', image: require('../assets/celebrities/willSmith.png') },
    { name: 'Janelle Monae', image: require('../assets/celebrities/janelleMonae.png') },
    { name: 'Oprah Winfrey', image: require('../assets/celebrities/oprahWinfrey.png') },
    { name: 'Drake', image: require('../assets/celebrities/drake.png') },
    { name: 'Ashton Kutcher', image: require('../assets/celebrities/ashtonKutcher.png') },
    { name: 'Ariana Grande', image: require('../assets/celebrities/arianaGrande.png') },
    { name: 'Elton John', image: require('../assets/celebrities/eltonJohn.png') },
  ],
  S: [
    { name: 'Herbie Hancock', image: require('../assets/celebrities/herbieHancock.jpeg') },
    { name: 'Prince', image: require('../assets/celebrities/prince.png') },
    { name: 'Taylor Swift', image: require('../assets/celebrities/taylorSwift.png') },
    { name: 'CeeLo Green', image: require('../assets/celebrities/ceeloGreen.png') },
    { name: 'Malala Yousafzai', image: require('../assets/celebrities/malalaYousafzai.png') },
    { name: 'Jackie Chan', image: require('../assets/celebrities/jackieChan.png') },
  ],
  C: [
    { name: 'Bill Gates', image: require('../assets/celebrities/billGates.png') },
    { name: 'Chris Pine', image: require('../assets/celebrities/chrisPine.png') },
    { name: 'Jodie Foster', image: require('../assets/celebrities/jodieFoster.png') },
    { name: 'Kirsten Dunst', image: require('../assets/celebrities/kirstenDunst.png') },
    { name: 'Matt Damon', image: require('../assets/celebrities/mattDamon.png') },
    { name: 'Kristen Stewart', image: require('../assets/celebrities/kristenStewart.png') },
    { name: 'Queen Elizabeth II', image: require('../assets/celebrities/queenElisabethII.png') },
    { name: 'Keanu Reeves', image: require('../assets/celebrities/keanuReeves.png') },
  ],
};

function ResultsPage() {
  const location = useLocation();
  const { resultType } = location.state || { resultType: 'Unknown' };
  const celebrities = celebrityImages[resultType] || [];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading the results...</p>
      </div>
    );
  }

  return (
    <div className="results-container">
      <h1>Your DISC Personality Type</h1>
      <p>Your result is: {resultType}</p>
      {celebrities.length > 0 && (
        <CelebritiesCarousel celebrities={celebrities} /> 
      )}
    </div>
  );
}

export default ResultsPage;
