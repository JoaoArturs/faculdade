import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button className="home-button" onClick={() => navigate('/')}>
       Home
    </button>
  );
};

export default HomeButton;
