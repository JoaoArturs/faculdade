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

interface CalendarData {
  [date: string]: Activity[];
}

const CalendarView: React.FC = () => {
  const [calendarData, setCalendarData] = useState<CalendarData>({});
  const navigate = useNavigate();

  useEffect(() => {
    const activities: Activity[] = JSON.parse(localStorage.getItem('activities') || '[]');
    const data: CalendarData = {};
    activities.forEach(activity => {
      if (!data[activity.date]) {
        data[activity.date] = [];
      }
      data[activity.date].push(activity);
    });
    setCalendarData(data);
  }, []);

  // Ordena as datas em ordem ascendente (os dias menores primeiro)
  const sortedDates = Object.keys(calendarData).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  // Função para determinar a classe baseada na proximidade da data
  const getDateClass = (dateStr: string): string => {
    const eventDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'past';            // Evento já passou → verde
    else if (diffDays <= 3) return 'urgent';    // Faltam 3 dias ou menos → vermelho
    else if (diffDays <= 10) return 'upcoming'; // Faltam 10 dias ou menos → amarelo
    else return '';                             //Cinza
  };

  return (
    <div className="container">
      <HomeButton />
      <h2>Calendário de Atividades</h2>
      {sortedDates.length === 0 ? (
        <p>Nenhuma atividade cadastrada.</p>
      ) : (
        <div className="calendar">
          {sortedDates.map(date => (
            <div key={date} className={`calendar-day ${getDateClass(date)}`}>
              <h3>{date}</h3>
              {calendarData[date].map(act => (
                <div key={act.id} className="calendar-activity">
                  <p>{act.name}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <button onClick={() => navigate('/atividades')}>Voltar para Atividades</button>
    </div>
  );
};

export default CalendarView;
