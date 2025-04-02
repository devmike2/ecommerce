// import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useEffect } from 'react';
import routeApi from './api/apiRoutes';
import Context from './context/useContex';
import useUserContext from './hooks/useUserDetails'
import { useAppStore } from './store/slice';


function App() {
  
  const {cartCount, setCartCount} = useAppStore()
  const {userInfo, setUserInfo} = useAppStore()



  const userinfo = async () =>{
    const res = await fetch(routeApi.userInfo.url,{
      method: routeApi.userInfo.method,
      credentials: 'include'
    })
    const data = await res.json()
    if (data.success){
      setUserInfo(data.data)
    }
  }

const  CartCounts = async () =>{
    const fetchRes = await fetch(routeApi.cartItemsCount.url,{
      method: routeApi.cartItemsCount.method,
      credentials: 'include',
    })
    const dataRes = await fetchRes.json()

    if(dataRes.success){
      setCartCount(dataRes.data)
    }
    if(dataRes.error){
      console.log(dataRes.message)
    }
}


  useEffect(() =>{
    userinfo()
    CartCounts()
},[])
  return (
    <>
      <Context.Provider value={{
        userinfo
      }}>
        <ToastContainer />
        <Header />
        <main className='min-h-[calc(100vh-130px)]'>
          <Outlet/>
        </main>  
        <Footer />
      </Context.Provider>  
    </>
  );
}

export default App;
