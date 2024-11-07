// import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import routeApi from './api/apiRoutes';
import Context from './context/useContex';

function App() {
  const userinfo = async() =>{
    const res = await fetch(routeApi.userInfo.url,{
      method: routeApi.userInfo.method,
      credentials: 'include'
    })
    const data = await res.json()

    console.log(data)
  }
  useEffect(() =>{
    userinfo()
},[])
  return (
    <>
      <Context.Provider value={{
        userinfo
      }}>
        <ToastContainer />
        <Header />
        <main className='min-h-[calc(100vh-165px)]'>
          <Outlet/>
        </main>  
        <Footer />
      </Context.Provider>  
    </>
  );
}

export default App;
