import React from 'react'
import { useNavigate } from "react-router-dom";
import bgMaps2 from "../assets/bgMaps2.png";

const MainPage = () => {
    const navigate = useNavigate();

    const handleDash = () =>{
        navigate("/dashboard");
    };
  return (
    <>
    {/* <!-- component --> */}
    <div
          className="w-full h-screen bg-center bg-cover"
          style={{ backgroundImage: `url(${bgMaps2})` }}
        >
          <section className="h-screen bg-cover">
            <div className="flex h-full w-full items-center justify-center container mx-auto px-8">
              <div className="max-w-2xl text-center bg-white p-6 rounded-lg shadow-lg opacity-90">
                <h1 className="text-3xl sm:text-5xl capitalize tracking-widest text-black lg:text-7xl opacity-100">La pikada de la esquina</h1>

                <p className="mt-6 lg:text-lg text-black">Press enter to review data information about your store</p>

                <div className="mt-8 flex flex-col space-y-3 sm:-mx-2 sm:flex-row sm:justify-center sm:space-y-0  opacity-100">
                  <form onSubmit={handleDash}>
                      <button type='submit' className="transform rounded-md bg-blue-700 px-8 py-2 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 ">Enter</button>
                  </form>
              </div>
              </div>
            </div>
          </section>
      </div>
    </>
  )
}

export default MainPage