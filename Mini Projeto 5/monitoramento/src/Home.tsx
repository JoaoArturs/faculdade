import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container home">
      <h1>Bem-vindo ao Gerenciador de Atividades</h1>
      <button onClick={() => navigate('/cadastro')}>Cadastrar Nova Atividade</button>
      <button onClick={() => navigate('/atividades')}>Ver Atividades Cadastradas</button>
      <button onClick={() => navigate('/calendario')}>Ver Calendário</button>
    </div>
  );
};

export default Home;
