import Header from "../components/Header/Header";
import HomeHero from "../components/HomeHero/HomeHero";
import CountdownTimer from "../components/CountdownTimer/CountdownTimer";
import ConferenceInfoCards from "../components/ConferenceInfoCards/ConferenceInfoCards";
import AboutConferenceSection from "../components/AboutConferenceSection/AboutConferenceSection";
import ConferenceObjectivesSection from "../components/ConferenceObjectivesSection/ConferenceObjectivesSection";
import AgendaSection from "../components/AgendaSection/AgendaSection";
import SpeakersSection from "../components/Speakers/SpeakersSection";
import Footer from "../components/Footer/Footer";

export default function HomePage() {
  return (
    <div className="app-page" dir="rtl">
      <Header />
      <HomeHero />
      <CountdownTimer />
      <ConferenceInfoCards />
      <AboutConferenceSection />
      <ConferenceObjectivesSection />
      <AgendaSection />
      <SpeakersSection />
      <Footer />
    </div>
  );
}
