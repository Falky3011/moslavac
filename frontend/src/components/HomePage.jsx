import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import NewsCarousel from "./NewsCarousel";
import PreviousAndNextMatch from './PreviousAndNextMatch';
import WebShop from "./WebShop";
import SeasonTicketPromo from "./SeasonTicketPromo";
import UpcomingMatches from "./UpcomingMatches";
import NewsLatest from "./NewsLatest";

const AnimatedSection = ({ children, className }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 }
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};


function HomePage() {
    return (
        <div className="py-6 space-y-8 sm:space-y-12 md:space-y-16">
            <AnimatedSection>
                <NewsCarousel />
            </AnimatedSection>

            <AnimatedSection className="bg-gray-100 p-6 sm:p-8 md:p-10 rounded-lg border border-gray-200">
                <PreviousAndNextMatch />
            </AnimatedSection>

            <AnimatedSection>
                <NewsLatest />
            </AnimatedSection>

            <AnimatedSection className="bg-gray-100 p-6 sm:p-8 md:p-10 rounded-lg border border-gray-200">
                <UpcomingMatches />
            </AnimatedSection>

            <AnimatedSection>
                <SeasonTicketPromo />
            </AnimatedSection>

            <AnimatedSection>
                <WebShop />
            </AnimatedSection>
        </div>
    );
}

export default HomePage;

