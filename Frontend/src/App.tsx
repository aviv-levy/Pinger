import { createContext, useEffect, useState } from 'react';
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap'
import { loading } from './Services/Interfaces';
import Loading from './Components/Loading';
import PingerPage from './Pages/PingerPage';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';


export const LoadingContext = createContext<loading | null>(null);
function App() {

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <>
      <Loading isLoading={isLoading} />
      <Navbar />
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <Routes>
          <Route path='/' element={<PingerPage />} />
        </Routes>
      </LoadingContext.Provider>
    </>
  )
}

export default App
