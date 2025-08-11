import { useState } from 'react';





// THIRD PARTY
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";

// STYLE
import './App.css'


// PAGES
import HomePage from './pages/HomePage'
import SearchResults from './pages/SearchResults';


// COMPONENTS
import Header from './components/Header'
import StarPage from './pages/StarPage';
import MovieDetails from './pages/MovieDetails';




function App() {
  const location = useLocation()
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  
  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className='relative h-screen w-full'>


      {/* <div className="fixed h-screen w-screen loading bg-main z-5 p-4">
        <div className='relative bg-[#222] h-full rounded-2xl flex items-center justify-center'>
          <h1 className='relative z-1 text-8xl uppercase font-bold text-white'>Loading</h1>
          <div className="absolute rounded-2xl inset-0 bg-[url('./assets/noise.png')] pointer-events-none bg-cover bg-center w-full h-full"></div>
        </div>
      </div> */}

      <div className="fixed inset-0 bg-[url('./assets/noise.png')] pointer-events-none bg-cover bg-center w-full h-screen"></div>










      {(location.pathname == "/") || (location.pathname == "/star") || (location.pathname == "/search") ?



        <div className='relative max-w-[500px] m-auto pt-38 px-2'>

          <div className='flex justify-center items-center gap-2'>
            <Flame color="#DD5C22" strokeWidth={1.5} fill='#FFB02E' size={25} />
            <h1 className='text-2xl text-main font-bold'>Recom Movies</h1>
          </div>


          <div className='mt-4'>
            <Header onSearch={handleSearch} />
          </div>


          <div className='mt-14'>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${location.pathname}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route index element={<HomePage />} />
                    <Route path='/star' element={<StarPage />} />
                    <Route path='/search' element={<SearchResults query={searchQuery} />} />
                  </Routes>
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>


          <footer className='mt-12 pb-10'>
            <p className='text-center text-[#666]'>Made with ♡ • 2025</p>
          </footer>
        </div>

        :

        <div className='relative'>
          <Routes>
            <Route path='/movie/:id' element={<MovieDetails query={searchQuery} />} />
          </Routes>
        </div>
      }




    </div >
  )
}

export default App
