import { useContext, useState } from "react";
import { LuUserCircle2 } from "react-icons/lu"
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import imageToBase64 from "../helpers/imagetobase64";
import routeApi from "../api/apiRoutes";
import { toast } from "react-toastify";
import Context from "../context/useContex";
import { useAppStore } from "../store/slice";



const Signup  = () => {
  const navigate = useNavigate()
    const [error, setError] = useState({
        name: '',
        password: '',
        username: '',
        email: '',
        confirmPassword:''
    })
    const [confirmShowPassword, setConfirmShowPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        name:'',
        username: '',
        email: '',
        password:'',
        confirmPassword: '',
        profilePic: ''
    })
    const [loading, setLoading] = useState(false)
    const { setuserInfo, setCartCount } = useAppStore()

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
        // alert('in the console')
        e.preventDefault()
        setLoading(true)
        if(data.password !== data.confirmPassword){
            setError((prev) =>{
                return {
                    ...prev,
                    confirmPassword : 'Password do not match'
                }
            })
        }
        else{
            const res = await fetch(routeApi.signupAPI.url, {
                method: routeApi.signupAPI.method,
                credentials: 'include',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(data)
            })
    
            const result = await res.json()
            if(result.data ){
                toast.success('user created successfuly')
                navigate('/')
                setuserInfo(result.data)
                FetchCartCount()
            }
            else{
                setError((prev) =>{
                    return {
                        name: result.error.name,
                        password: result.error.password,
                        email: result.error.email
                    }
                })
            }
        }
        setLoading(false)
        
    }
    const handlePic = async (e) => {
        const file  = e.target.files[0]
            console.log('file', file)
            const image = await imageToBase64(file)
        setData((prev) =>{
            return{
                ...prev,
                profilePic: image
            }
        })

    }
    const handleChange = (e) =>{
        const {name, value} = e.target

        setData((prev) =>{
            return {
                ...prev, 
                [name] : value
            }

        })
        
    }
    
    // console.log(data)
    return (
        <div id="signup" className="container mx-auto bg-white max-w-sm my-6 md:rounded-lg  shadow-2xl">
           
            <div className="block px-2 pt-3">
                <div className="relative  flex-col flex  items-center mx-auto rounded-full w-20  border-2 border-red-600 mb-8 h-20">
                    {
                        // ============================= PROFILE PIC =========================================
                        data.profilePic ? 
                        <div className="absolute">
                            <img src={ data.profilePic } alt="" className="w-20 h-20 rounded-full object-cover" />
                        </div>
                          :
                        <div className="flex justify-center text-5xl text-red-600  animate-bounce z-0 absolute bottom-1">
                            < LuUserCircle2 /> 
                        </div>
                    }       
                    <div className="absolute bottom-0 bg-slate-200 py-3 opacity-80 px-3  rounded-b-full top-10">
                        <form className=" ">
                            <label className=" cursor-pointer rounded-full">upload
                                <input 
                                type="file" 
                                className="bg-transparent hidden "
                                onChange={handlePic}
                                name="profilePic"
                                />
                            </label>
                           
                        </form>
                    </div>
                </div>
                <form id="form" className="flex flex-col" onSubmit={handleSubmit}>
                    {/* ================ Name field ====================*/}
                    <div className="py-1">
                        <label className="  text-1xl">Name: </label>
                        <div className="w-ful bg-slate-200 py-2 px-1 rounded-md">
                            <input type="text"
                            placeholder="enter your name"
                            value={data.name}
                            onChange={handleChange}
                            required
                            name="name"
                            className="w-full h-full bg-transparent focus:outline-none"  />
                        </div>
                        <div className="text-red-600"><span>{ error.name }</span></div>
                    </div>
                    {/* ================ username field ====================*/}
                    <div className="py-1">
                        <label className="  text-1xl">Username: </label>
                        <div className="w-ful bg-slate-200 py-2 px-1 rounded-md">
                            <input type="text"
                            placeholder="enter your username"
                            value={data.username}
                            onChange={handleChange}
                            required
                            name="username"
                            className="w-full h-full bg-transparent focus:outline-none"  />
                        </div>
                        <div className="text-red-600"><span>{ error.username }</span></div>
                    </div>
                    {/* ================ email field ====================*/}
                    <div className="py-1">
                        <label className="  text-1xl">Email: </label>
                        <div className="w-ful bg-slate-200 py-2 px-1 rounded-md">
                            <input type="text"
                            placeholder="enter your email"
                            value={data.email}
                            onChange={handleChange}
                            required
                            name="email"
                            className="w-full h-full bg-transparent focus:outline-none"  />
                        </div>
                        <div className="text-red-600"><span>{ error.email }</span></div>
                    </div>
                    {/* =============== password field ==================  */}
                    <div className="py-1">
                        <label className=" 00 text-1xl ">Password:</label>
                        <div className="bg-slate-200 py-2 px-1 rounded-md flex justify-between items-center">
                            <input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="enter your password"
                            onChange={handleChange}
                            value={data.password}
                            required
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
                        <div className="text-red-600"><span>{ error.password }</span></div>
                    </div>
                    {/* ================ confirm password =================== */}
                    <div className="py-1">
                        <label className=" 00 text-1xl ">Confirm Password:</label>
                        <div className="bg-slate-200 py-2 px-1 rounded-md flex justify-between items-center">
                            <input 
                            type={confirmShowPassword ? 'text' : 'password'} 
                            placeholder="confirm password"
                            onChange={handleChange}
                            value={data.confirmPassword}
                            required
                            name="confirmPassword"
                            className="w-full -full  bg-transparent focus:outline-none" />
                            {/* ============ handling eye icon ==================  */}
                            <div className="cursor-pointer" onClick={()=> setConfirmShowPassword((prev) => !prev)}>
                                <span>
                                    {
                                        confirmShowPassword? 
                                        <FaEyeSlash />
                                        :
                                        <FaEye />
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="text-red-600"><span>{ error.confirmPassword }</span></div>
                    </div>
                    {/* =============== signin button ===================== */}
                    <div className="flex justify-center">
                        <button className="bg-red-600 mt-3 text-white px-14 py-2 rounded-full  hover:translate-x-2 hover:bg-red-700 hover:transition-all">{ loading ? "loading...............................": "Signup"}</button>
                    </div>
                    {/* ================ additional text ========================*/}
                    <div className="pt-12 pb-6 ">
                        <p>Already have an account? <Link to={'/login'} className="text-red-600 hover:text-red-700 hover:underline"> Login
                        </Link></p>
                    </div>
                </form>
            </div>
     </div>
      );
}
 
export default Signup;