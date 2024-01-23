import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import HeroSection from "@/components/hero";
import { LandingNavbar } from "@/components/navbar-landing";



export default function HomePage(){
    return(<div>
        <LandingNavbar/>
        <HeroSection/>
        <Features/>
        <Footer/>

    </div>)
}