import Link from "next/link";
import { Button } from "./ui/button";

export default function HeroSection(){
    return (<div>
    
<section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start text-center sm:text-left mb-16 md:mb-0 items-center ">
    <h1 className="title-font sm:text-7xl text-4xl mb-2 font-light  text-gray-800 text-center sm:text-left">Don't get stuck writing 
<span className="font-black"> emails anymore.</span> <br/> 
      </h1>
      <p className="mb-8 leading-relaxed text-xl sm:text-2xl text-gray-500 "> We boost your email writing productivity by 90% with AI Email Generator.</p>
                <div className="flex justify-center">
        <Button ><Link href="/sign-up">Get Started</Link></Button>
        
        
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
    <div style={{position: "relative", paddingBottom: "56.25%", height: "0"}}><iframe src="https://www.loom.com/embed/f74b5ccd35634a0a8ce7cc0ad9b827ff?sid=acc5e9ca-4f31-4a05-a24d-f41ebebe79a1" frameBorder="0" allowFullScreen  style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%"}}></iframe></div>
    </div>
  </div>
</section>
    </div>)
}