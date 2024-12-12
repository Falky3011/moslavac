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
    const { data, error, isLoading } = useGetAllMatches();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [calendarView, setCalendarView] = useState(Views.MONTH);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (windowWidth < 768) {
            setCalendarView(Views.DAY);
        } else {
            setCalendarView(Views.MONTH);
        }
    }, [windowWidth]);

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
        <div className='my-5 w-full px-4 md:w-10/12 md:mx-auto  '>
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
                className="rbc-calendar min-h-[700px] h-auto pb-[20px] rounded-3xl shadow-md "
            />
        </div>
    );
}

export default MatchCalendar;