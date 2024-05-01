import { createContext, useEffect, useState } from 'react';
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap'
import { loading } from './Services/Interfaces';
import LoginPage from './Pages/LoginPage'
import Loading from './Components/Loading';
import { verifyToken } from './Auth/TokenManager';
import PingerPage from './Pages/PingerPage';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage';
import Navbar from './Components/Navbar';


export const LoadingContext = createContext<loading | null>(null);
function App() {

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // if (verifyToken()) {
    //   const getUserDetailss = async () => setUserDetails(await getUserDetails())
    //   getUserDetailss()
    //     .then(() => {
    //       setFirstLoading(false)
    //     })
    //     .catch((err) => {
    //       if (err)
    //         removeToken();
    //     });
    // }
    // else {
    //   setFirstLoading(false)
    // }
    setIsLoading(false)
  }, [])

  return (
    <>
      <Loading isLoading={isLoading} />
      <Navbar />
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <Routes>
          <Route path='/' element={<PingerPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/addnewuser' element={<RegisterPage />} />
        </Routes>
      </LoadingContext.Provider>
    </>
  )
}

export default App
