import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { addHours } from 'date-fns';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useGetAllMatches from '../hooks/useGetAllMatches';
import '../css/calendar.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing


const localizer = momentLocalizer(moment);

// Postavite lokalizaciju na hrvatski i prvi dan u tjednu na ponedjeljak
moment.locale('hr'); // Postavljanje hrvatskog jezika
moment.updateLocale('hr', {
    week: { dow: 1 } // `dow: 1` postavlja ponedjeljak kao prvi dan
});

// Definirajte poruke na hrvatskom jeziku
const messages = {
    date: 'Datum',
    time: 'Vrijeme',
    event: 'Događaj',
    allDay: 'Cijeli dan',
    week: 'Tjedan',
    work_week: 'Radni tjedan',
    day: 'Dan',
    month: 'Mjesec',
    previous: 'Prethodni',
    next: 'Sljedeći',
    yesterday: 'Jučer',
    tomorrow: 'Sutra',
    today: 'Danas',
    agenda: 'Agenda',
    noEventsInRange: 'Nema događaja u ovom razdoblju.',
    showMore: total => `+ Prikaži još ${total}`
};

function MatchCalendar() {
    const navigate = useNavigate();
    const { data, error, isLoading } = useGetAllMatches();

    if (isLoading) return <div>Učitavanje...</div>;
    if (error) return <div>Greška pri učitavanju utakmica</div>;

    const events = data?.map(match => {
        const start = new Date(match.dateTimeUTC);
        const end = addHours(start, 2);
        const categoryName = match.competition.name;

        return {
            title: `${categoryName} - ${match.homeTeam.name} vs ${match.awayTeam.name}`,
            start: start,
            end: end,
            allDay: false,
            description: `${match.homeTeam.name} vs ${match.awayTeam.name} u ${match.competition.name}`,
            id: match.id
        };
    });

    return (
        <div className='h-[500px] my-20 w-10/12 mx-auto'>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                tooltipAccessor="description"
                style={{ height: 500 }}
                views={['month', 'week', 'day']}
                defaultView="month"
                messages={messages} // Dodane poruke na hrvatskom
                selectable
                onSelectEvent={event => navigate(`/matches/${event.id}`)}
                min={moment().set({ hour: 7, minute: 0 }).toDate()}
            />
        </div>
    );
};

export default MatchCalendar;
