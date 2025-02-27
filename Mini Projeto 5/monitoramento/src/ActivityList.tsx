import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from './HomeButton';

interface Activity {
  id: number;
  name: string;
  responsible: string;
  date: string;
  description: string;
}

const ActivityList: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedActivities: Activity[] = JSON.parse(localStorage.getItem('activities') || '[]');
    setActivities(storedActivities);
  }, []);

  const handleDelete = (id: number) => {
    const updatedActivities = activities.filter(activity => activity.id !== id);
    setActivities(updatedActivities);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
  };

  const filteredActivities = activities.filter(activity =>
    activity.name.toLowerCase().includes(search.toLowerCase()) ||
    activity.responsible.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
        <div className="top-buttons">
        <HomeButton />
        <button className="main-button" onClick={() => navigate('/cadastro')}>Cadastrar Nova Atividade</button>
        <button className="main-button" onClick={() => navigate('/calendario')}>Ver Calendário</button>
      </div>

      <h2>Lista de Atividades</h2>

      {/* Barra de pesquisa */}
      <input
        type="text"
        className="search-input"
        placeholder="Buscar por nome ou responsável..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Lista de atividades */}
      <div className="activity-list">
        {filteredActivities.length === 0 ? (
          <p>Nenhuma atividade encontrada.</p>
        ) : (
          <div className="activity-grid">
            {filteredActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <h3>{activity.name}</h3>
                <p><strong>Responsável:</strong> {activity.responsible}</p>
                <p><strong>Data:</strong> {activity.date}</p>

                {/* Botões lado a lado */}
                <div className="button-group">
                  <button className="details-btn" onClick={() => navigate(`/atividade/${activity.id}`)}>Detalhes</button>
                  <button className="edit-btn" onClick={() => navigate(`/editar/${activity.id}`)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(activity.id)}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityList;
