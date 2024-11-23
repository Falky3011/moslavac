import NewsCarousel from "./NewsCarousel";
import PreviousAndNextMatch from './PreviousAndNextMatch';
import WebShop from "./WebShop";
import SeasonTicketPromo from "./SeasonTicketPromo";
import UpcomingMatches from "./UpcomingMatches";
import NewsLatest from "./NewsLatest";

function HomePage() {
    return (
        <div className="py-6 space-y-8 sm:space-y-12 md:space-y-16">
            <NewsCarousel />
            <div className="bg-gray-100 p-6 sm:p-8 md:p-10 rounded-lg  border border-gray-200">
                <PreviousAndNextMatch />
            </div>
            <NewsLatest></NewsLatest>
            <div className="bg-gray-100 p-6 sm:p-8 md:p-10 rounded-lg  border border-gray-200">
                <UpcomingMatches></UpcomingMatches>
            </div>
            <SeasonTicketPromo />

            <WebShop />
        </div>
    );
}

export default HomePage;
