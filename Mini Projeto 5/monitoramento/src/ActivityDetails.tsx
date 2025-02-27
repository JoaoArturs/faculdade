import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HomeButton from './HomeButton';

interface Activity {
  id: number;
  name: string;
  responsible: string;
  date: string;
  description: string;
}

const ActivityDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedActivities: Activity[] = JSON.parse(localStorage.getItem('activities') || '[]');
    const foundActivity = storedActivities.find(act => act.id === Number(id));
    setActivity(foundActivity || null);
  }, [id]);

  if (!activity) {
    return (
      <div className="container">
        <HomeButton />
        <p>Atividade não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <HomeButton />
      <h2>{activity.name}</h2>
      <p><strong>Responsável:</strong> {activity.responsible}</p>
      <p><strong>Data:</strong> {activity.date}</p>
      <p><strong>Descrição:</strong> {activity.description}</p>
      <button onClick={() => navigate(`/editar/${activity.id}`)}>Editar</button>
      <button onClick={() => navigate('/atividades')}>Voltar</button>
    </div>
  );
};

export default ActivityDetails;
