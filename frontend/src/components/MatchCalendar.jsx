import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { addHours } from 'date-fns';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useGetAllMatches from '../hooks/useGetAllMatches';
import '../css/calendar.css';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

// Postavite lokalizaciju na hrvatski i prvi dan u tjednu na ponedjeljak
moment.locale('hr');
moment.updateLocale('hr', {
    week: { dow: 1 }
});

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
    const { data: matches, error, isLoading } = useGetAllMatches();
    const [calendarView, setCalendarView] = useState(window.innerWidth < 768 ? Views.DAY : Views.MONTH);

    useEffect(() => {
        const handleResize = () => {
            const newView = window.innerWidth < 768 ? Views.DAY : Views.MONTH;
            setCalendarView(newView);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isLoading) return <div>Učitavanje...</div>;
    if (error) return <div>Greška pri učitavanju utakmica</div>;

    const events = matches?.map(match => ({
        title: `${match.competition.name} - ${match.homeTeam.name} vs ${match.awayTeam.name}`,
        start: new Date(match.dateTimeUTC),
        end: addHours(new Date(match.dateTimeUTC), 2),
        allDay: false,
        description: `${match.homeTeam.name} vs ${match.awayTeam.name} u ${match.competition.name}`,
        id: match.id
    }));

    return (
        <div className="my-5 w-full px-4 md:w-10/12 md:mx-auto">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                tooltipAccessor="description"
                views={['month', 'week', 'day']}
                defaultView={calendarView}
                view={calendarView}
                onView={setCalendarView}
                messages={messages}
                selectable
                onSelectEvent={event => navigate(`/matches/${event.id}`)}
                min={moment().set({ hour: 7, minute: 0 }).toDate()}
                className="rbc-calendar min-h-[700px] h-auto pb-[20px] rounded-3xl shadow-md"
            />
        </div>
    );
}

export default MatchCalendar;
