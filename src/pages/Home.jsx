import ContactUs from "../components/home/ContactUs";
import Hero from "../components/home/Hero/Hero";
import PopularClasses from "../components/home/PopularClasses";
import PopularInstructors from "../components/home/PopularInstructors";

const Home = () => {
    return (
        <div>
            <Hero/>
            <PopularClasses/>
            <PopularInstructors/>
            <ContactUs/>
        </div>
    );
};

export default Home;