import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CustomHeader from './components/CustomHeader';
import MatchCalendar from './components/MatchCalendar';
import NewsList from './components/NewsList';
import NewsDetail from './components/NewsDetail';
import NewsManager from './components/NewsManager';
import CompetitionInfo from './components/CompetitionInfo';
import PlayersList from './components/PlayersList';
import PlayerStats from './components/PlayerStats';
import MatchDetails from './components/MatchDetails';
import HomePage from './components/HomePage';
import Newsletter from './components/Newsletter';
import FirstTeam from './components/FirstTeam';
import Footer from './components/Footer';
import SeasonTicketPurchase from './components/SeasonTicketPurchase';
import { generateToken, messaging } from './config/firebaseConfig';
import { onMessage } from 'firebase/messaging';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Provjerava da li je modal već prikazan
    const isModalShown = sessionStorage.getItem('isModalShown');

    if (!isModalShown) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        sessionStorage.setItem('isModalShown', 'true');
      }, 5000);

      return () => clearTimeout(timer);
    }

    // Dohvati i spremi token u localStorage
    const fetchToken = async () => {
      const token = await generateToken();
      if (token) {
        localStorage.setItem('firebaseToken', token);
        console.log('Firebase token saved:', token);
      } else {
        console.error('Failed to retrieve Firebase token');
      }
    };

    fetchToken(); // Poziv asinkrone funkcije

    onMessage(messaging, (payload) => {
      console.log('Notification received:', payload);
      const { title, body } = payload.data;

      // Display notification using the Notification API
      new Notification(title, {
        body,
      });
    });
  }, []);


  return (
    <Router>
      <CustomHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/matches" element={<MatchCalendar />} />
        <Route path="/season/:competitionId/:competitionName" element={<CompetitionInfo />}></Route>
        <Route path="/players/:id" element={<PlayersList />}></Route>
        <Route path="/stats/:playerId" element={<PlayerStats />} />
        <Route path="/news" element={<NewsList />}></Route>
        <Route path="/news/admin" element={<NewsList />}></Route>
        <Route path="/news/:id" element={<NewsDetail />}></Route>
        <Route path="/admin/manage-news" element={<NewsManager />}></Route>
        <Route path="/matches/:matchId" element={<MatchDetails />} />
        <Route path="/first-team" element={<FirstTeam />} />
        <Route path="/season-ticket-purchase" element={<SeasonTicketPurchase />} />
      </Routes>

      <Newsletter
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Footer />
    </Router>
  );
}

export default App;
