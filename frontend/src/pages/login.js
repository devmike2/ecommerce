import { useContext, useState } from "react";
import { LuUserCircle2 } from "react-icons/lu"
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import routeApi from "../api/apiRoutes"
import { toast } from "react-toastify"
import Context from "../context/useContex";
import { useAppStore } from "../store/slice";

const Login = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState({
        error : ''
    })
    const [loading, setLoading] = useState(false)
    const { setUserInfo, setCartCount } = useAppStore()

    const FetchCartCount = async() =>{
    
        const fetchCount = await fetch(routeApi.cartItemsCount.url,{
            method: routeApi.cartItemsCount.method,
            credentials: 'include'
        })
        const dataRes = await fetchCount.json()
        if(dataRes.success){
            setCartCount(dataRes.data)
        }
    }

    // =================== handleSubmit ==============
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        try{
            const res= await fetch(routeApi.loginApi.url, {
                method: routeApi.loginApi.method,
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            const result  = await res.json()
            if (result.data) {
                toast.success('login successful')
                navigate('/')
                setUserInfo(result.data)
                FetchCartCount()
            }
            if (result.error){
                setError((prev) =>{
                    return {
                        ...prev,
                        
                        error : 'Incorrect Credentials'
                        
                    }
                })
        }
        
       }
       catch(err){
        console.log('something went wrong', err)
       }
       finally{
        setLoading(false)
       }
    }
    const handleChange = (e) =>{
        const {name , value} = e.target
        setData((prev) =>{
            return {
                ...prev,
                [name]: value
            }
        })
        
    }


    return ( 
        <div id="login" className="container mx-auto bg-white max-w-sm my-6 md:rounded-lg  shadow-2xl">
            
           <div className="block px-2 pt-6">
                <div className="flex justify-center text-5xl text-red-600 animate-bounce z-0">
                    <LuUserCircle2 />
                </div>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    {/* ================ email field ====================*/}
                    <div className="py-1">
                        <label className="  text-1xl">Email: </label>
                        <div className="w-ful bg-slate-200 py-2 px-1 rounded-md">
                            <input type="text"
                            placeholder="enter your password"
                            value={data.email}
                            required
                            onChange={handleChange}
                            name="email"
                            className="w-full h-full bg-transparent focus:outline-none"  />
                        </div>
                    </div>
                    {/* =============== password field ==================  */}
                    <div className="py-1">
                        <label className=" 00 text-1xl ">Password:</label>
                        <div className="bg-slate-200 py-2 px-1 rounded-md flex justify-between items-center">
                            <input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="enter your password"
                            onChange={handleChange}
                            required
                            value={data.password}
                            name="password"
                            className="w-full -full  bg-transparent focus:outline-none" />
                            {/* ============ handling eye icon ==================  */}
                            <div className="cursor-pointer" onClick={()=> setShowPassword((prev) => !prev)}>
                                <span>
                                    {
                                        showPassword? 
                                        <FaEyeSlash />
                                        :
                                        <FaEye />
                                    }
                                </span>
                            </div>
                        </div>
                        <div className=" text-red-600 text-1xl">
                            <span>{ error.error }</span>
                        </div>
                        {/* ============= forgot password =============== */}
                        <div>
                            <Link to={'/forgot-password'} className="float-end hover:underline hover:text-red-600 cursor-pointer">Forgot Password</Link>
                        </div>
                    </div>
                    {/* =============== login button ===================== */}
                    <div className="flex justify-center">
                        <button className="bg-red-600  text-white px-14 py-2 rounded-full  hover:translate-x-2 hover:bg-red-700 hover:transition-all">{ loading ? 'loading.............': 'Login'} </button>
                    </div>
                    {/* ================ additional text ========================*/}
                    <div className="pt-12 pb-6 ">
                        <p>Don't have an account? <Link to={'/signup'} className="text-red-600 hover:text-red-700 hover:underline"> Signup
                        </Link></p>
                    </div>
                </form>
           </div>
        </div>
     );
}
 
export default Login;