import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HomeButton from './HomeButton';

interface Activity {
  id: number;
  name: string;
  responsible: string;
  date: string;
  description: string;
}

const ActivityForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [responsible, setResponsible] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  // Obtém a data atual no formato YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (id) {
      const storedActivities: Activity[] = JSON.parse(localStorage.getItem('activities') || '[]');
      const activity = storedActivities.find(act => act.id === Number(id));
      if (activity) {
        setName(activity.name);
        setResponsible(activity.responsible);
        setDate(activity.date);
        setDescription(activity.description);
      }
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !responsible || !date || !description) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    // Verificação extra para garantir que a data não é passada
    if (date < today) {
      alert('Você não pode criar atividades para dias que já passaram!');
      return;
    }

    let activities: Activity[] = JSON.parse(localStorage.getItem('activities') || '[]');

    if (id) {
      // Modo de edição
      activities = activities.map(act =>
        act.id === Number(id) ? { ...act, name, responsible, date, description } : act
      );
    } else {
      // Novo cadastro
      const newActivity = { id: Date.now(), name, responsible, date, description };
      activities.push(newActivity);
    }

    localStorage.setItem('activities', JSON.stringify(activities));
    navigate('/atividades');
  };

  return (
    <div className="container">
      <HomeButton />
      <div className="form-container">
        <h2>{id ? 'Editar Atividade' : 'Cadastrar Atividade'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome da Atividade:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Responsável:</label>
            <input 
              type="text" 
              value={responsible} 
              onChange={(e) => setResponsible(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Data:</label>
            <input 
              type="date" 
              value={date} 
              min={today}  // Define o mínimo para a data atual
              onChange={(e) => setDate(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Descrição:</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">{id ? 'Atualizar' : 'Salvar'}</button>
        </form>
      </div>
    </div>
  );
};

export default ActivityForm;
