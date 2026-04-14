import HomeNav from "../components/HomeNav";
import heroImg from "../assets/home-img.jpg";



function Home() {
  return (
    <>
       <HomeNav />

       {/* Hero img section */}
       <section id="#home">
        <div
        className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-center text-white"
        style={{ backgroundImage: `url(${heroImg})` }}>
        {/* Overlay (optional for readability) */}
        <div className="bg-black/50 absolute inset-0"></div>

        {/* Content */}
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            From Confusion to Confidence
          </h1>

          <p className="mt-4 text-lg md:text-sm ml mx-7">
          Connect with mentors who help you grow academically and personally, guiding you through challenges
          </p>
        </div>
      </div>
       </section>

       {/* About us section */}
       <section id="about">
        <div>
          
        </div>

       </section>





    </>
  );
}

export default Home;