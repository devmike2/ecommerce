import { FaRegUserCircle } from "react-icons/fa"
import  useUserContext from '../hooks/useUserDetails';
import { Link, Outlet, useNavigate } from "react-router-dom";
const AdminPage = () => {
    const {userdetails} = useUserContext()
    const navigate = useNavigate()
    if(!userdetails){
        navigate('/login')
    }
    return ( 
        <div className=" min-h-[calc(100vh-130px)] md:flex hidden">
            <aside className="admin max-w-52 w-full bg-white min-h-full">
                <div className="h-40  flex justify-center items-center flex-col">
                    {
                    userdetails?
                            <div className='text-sxl cursor-pointer'>
                                <img src={userdetails?.profilePic} alt="" className="w-16 h-16 rounded-full object-cover" /> 
                            </div>
                                
                            :
                            <div className='text-5xl cursor-pointer'>
                                <span>
                                    <FaRegUserCircle />
                                </span>
                            </div>   
                    }  
                    <p className="font-semibold text-xl">{userdetails?.username}</p>
                    <p className="text-base">{userdetails?.role}</p>
                </div>
                <div className="p-4">
                    <Link to={'all-user'}>
                        <p className="py-2 px-2 hover:shadow-md">All User</p>
                    </Link>
                    <Link to={'all-products'}>
                        <p className="py-2 px-2 hover:shadow-md">Products</p>
                    </Link>
                </div>
            </aside>
            <main className="h-full w-full p-2">
                <Outlet />
            </main>
        </div>
     );
}
 
export default AdminPage;