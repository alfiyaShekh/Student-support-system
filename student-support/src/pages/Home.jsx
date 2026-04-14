import HomeNav from "../components/HomeNav";
import heroImg from "../assets/home-img.jpg";
import howVideo from "../assets/How.mp4"
import mentors from "../components/Mentors"
import Mentors from "../components/Mentors";


function Home() {
  const handleSubmit=(e)=>{
    e.preventDefault();
    alert("Thank you for connecting")
  }
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
         <div id="about" className="py-10 bg-gray-100 px-4 sm:px-6 lg:px-12">

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800">
              Why Mentora?
            </h2>
          
            {/* Subtitle */}
            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 text-center max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
              Mentora helps first-year students adapt to college life by connecting them with experienced mentors for guidance, support, and confidence building.
            </p>
          
            {/* Cards */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
              {/* Card 1 */}
              
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300">
              
              <img 
                src="https://images.pexels.com/photos/36729385/pexels-photo-36729385.jpeg" 
                alt="Guidance"
                className="w-full h-40 object-cover"
              />
          
              <div className="p-4">
                <h3 className="text-lg font-semibold">Guidance</h3>
                <p className="text-gray-600 mt-2 text-sm">
                  Get advice from experienced mentors who understand your journey.
                </p>
              </div>
          
            </div>
          
                    
              {/* Card 2 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300">
    
                    <img 
                      src="https://images.pexels.com/photos/9775851/pexels-photo-9775851.jpeg" 
                      alt="Support"
                      className="w-full h-40 object-cover"
                    />
                
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">Support</h3>
                      <p className="text-gray-600 mt-2 text-sm">
                        Overcome academic and social challenges with proper help.
                      </p>
                    </div>
                
                  </div>
                
          

             {/* Card 2 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300">
    
                    <img 
                      src="https://images.pexels.com/photos/36763607/pexels-photo-36763607.jpeg" 
                      alt="Support"
                      className="w-full h-40 object-cover"
                    />
                
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">Confidence</h3>
                      <p className="text-gray-600 mt-2 text-sm">
                         Build confidence and make better decisions for your future
                      </p>
                    </div>
                
                  </div>
             
          
            </div>
          </div>

       </section>

       <section id="how">
                     

          <div id="how" className="py-10 bg-white text-center px-6">
          
            <h2 className="text-3xl font-bold text-gray-800">
              How It Works
            </h2>
          
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              See how Mentora connects students with mentors and simplifies your college journey.
            </p>
          
            {/* Video */}
            <div className="mt-8 flex justify-center">
              <video 
                src={howVideo} 
                controls 
                className="w-screen max-w-3xl rounded-xl shadow-lg h-70" autoPlay
              />
            </div>
                           
            {/* Mentors Preview */}
              <div className="mt-16">
              
                <h3 className="text-2xl font-bold text-gray-800">
                  Meet Our Mentors
                </h3>
              
                <p className="mt-2 text-gray-600">
                  Learn from experienced mentors who guide and support you.
                </p>
              
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                   <Mentors name="Anaya Sharma" mentor="CSE Mentor" bio="Helping Students through coding and technology" img="https://randomuser.me/api/portraits/women/44.jpg" rating={5}/>
                   <Mentors name="Rohit Pande" mentor="ME Mentor" bio="Helping students understand core mechanical concepts" img="https://randomuser.me/api/portraits/men/62.jpg" rating={4}/>
                   <Mentors name="Priti Jadeja" mentor="ENC Mentor" bio="Guiding students in electronics, circuits" img="https://randomuser.me/api/portraits/women/42.jpg" rating={3}/>
                    <Mentors name="Ankit Patil" mentor="Robotics Mentor" bio="Supporting students in building innovative robots" img="https://randomuser.me/api/portraits/men/60.jpg" rating={4}/>
                  
              
                </div>
              
              </div>

          
          </div>
</section>


     <section
  id="contact"
  className="relative py-20 bg-cover bg-center"
  style={{
    backgroundImage: `url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f")`,
  }}
>

  {/* Overlay (blur + dark) */}
  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

  {/* Content */}
  <div className="relative z-10 px-6">

    {/* Title */}
    <h2 className="text-3xl font-bold text-center text-white">
      Contact Us
    </h2>

    <p className="mt-4 text-gray-200 text-center max-w-xl mx-auto">
      Have questions? We’d love to hear from you.
    </p>

    {/* Form */}
    <div className="mt-10 max-w-2xl mx-auto bg-white/90 p-6 rounded-xl shadow-lg">

      <form className="space-y-4" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400" required
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400" required
        />

        <textarea
          rows="4"
          placeholder="Your Message"
          className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400" required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Send Message
        </button>

      </form>

    </div>

    {/* Social Links */}
    <div className="mt-8 flex justify-center space-x-6 text-white text-xl">

      <a className="hover:scale-110 transition">📧</a>
      <a className="hover:scale-110 transition">📱</a>
      <a className="hover:scale-110 transition">🌐</a>

    </div>

  </div>

</section>



    </>
  );
}

export default Home;