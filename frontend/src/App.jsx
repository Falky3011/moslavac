import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import CustomHeader from "./components/CustomHeader";
import MatchCalendar from "./components/MatchCalendar";
import NewsList from "./components/NewsList/NewsList";
import NewsDetail from "./components/NewsDetail";
import NewsManager from "./components/NewsManager/NewsManager";
import CompetitionInfo from "./components/CompetitionInfo/CompetitionInfo";
import PlayerStats from "./components/PlayerStats";
import MatchInfo from "./components/MatchInfo/MatchInfo";
import HomePage from "./components/HomePage";
import FirstTeam from "./components/FirstTeam/FirstTeam";
import Footer from "./components/Footer";
import SeasonTicketPurchase from "./components/SeasonTicketPurchase";
import { generateToken, messaging } from "./config/firebaseConfig";
import { onMessage } from "firebase/messaging";
import { useAdminModal } from "./utils/adminUtils";

function AdminModalWrapper() {
  const location = useLocation();
  const { AdminModal } = useAdminModal();

  // Provjeravamo da li trenutni URL sadrži "/admin"
  const isAdminRoute = location.pathname.includes("/admin");

  return isAdminRoute ? <AdminModal /> : null;
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Provjerava da li je modal već prikazan
    const isModalShown = sessionStorage.getItem("isModalShown");

    if (!isModalShown) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        sessionStorage.setItem("isModalShown", "true");
      }, 5000);

      return () => clearTimeout(timer);
    }

    // Dohvati i spremi token u localStorage
    const fetchToken = async () => {
      const token = await generateToken();
      if (token) {
        localStorage.setItem("firebaseToken", token);
      } else {
      }
    };

    fetchToken(); // Poziv asinkrone funkcije

    onMessage(messaging, (payload) => {
      const { title, body, icon } = payload.data;

      // Display notification using the Notification API
      new Notification(title, {
        body,
        icon,
      });
    });
  }, []);

  return (
    <Router>
      <CustomHeader />
      {/* Admin modal za provjeru */}
      <AdminModalWrapper />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<HomePage />} />
        <Route path="/matches" element={<MatchCalendar />} />
        <Route
          path="/season/:competitionId/:competitionName"
          element={<CompetitionInfo />}
        ></Route>
        <Route path="/stats/:playerId" element={<PlayerStats />} />
        <Route path="/news" element={<NewsList />}></Route>
        <Route path="/news/:id" element={<NewsDetail />}></Route>
        <Route path="/admin/manage-news" element={<NewsManager />}></Route>
        <Route path="/matches/:matchId" element={<MatchInfo />} />
        <Route path="/first-team" element={<FirstTeam />} />
        <Route
          path="/season-ticket-purchase"
          element={<SeasonTicketPurchase />}
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
