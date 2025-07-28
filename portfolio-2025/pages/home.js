import NavBar from "@/components/navBar";
import HeroSection from "@/components/HeroSection";
import AboutPage from "@/components/AboutPage";
import Projects from "@/components/Projects";

export default function Home() {
    return (
        <>
            <NavBar />
            <HeroSection />
            <AboutPage />
            <Projects />
        </>
    );
}
