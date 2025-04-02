import { useNavigate } from "react-router-dom";
import routeApi from "../api/apiRoutes";
import { toast } from "react-toastify";
import Context from "../context/useContex";
import { useContext } from "react";
const Logout =  ({onClick}) => {
    const navigate = useNavigate()
    const { userinfo } = useContext(Context)
    const handlelogout =  async() =>{
        const res = await fetch(routeApi.logout.url, {
            method: routeApi.logout.method,
            credentials: 'include'
        })
        const data = await res.json()
        if(data.success){
            toast.success(data.message)
            navigate('/')
            userinfo()
        }
    }
    return ( 
        <div className="fixed inset-0 w-full h-full  flex justify-between z-20 items-center bg-slate-200 bg-opacity-75 ">
            <div className="container max-w-sm mx-auto shadow-md  h-50 bg-white"> 
                <div className=" p-10 text-center">
                    <h2>Are you sure you want to log out?</h2>

                    <div className="md:rounded flex justify-between pt-6" >
                        <div className=" bg-red-600 cursor-pointer text-white px-10 py-2 rounded-full  hover:translate-x-2 hover:bg-red-700 hover:transition-all" onClick={handlelogout}>
                            <span className="underline">yes</span>       
                        </div>
                        <div className="bg-green-600 cursor-pointer  text-white px-10 py-2 rounded-full  hover:translate-x-2 hover:bg-green-700 hover:transition-all"onClick={onClick}> 
                            <span className="underline">
                                No  
                            </span>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
     );
}
 
export default Logout;