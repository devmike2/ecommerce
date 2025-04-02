import { useState } from "react";
import ROLE from "../helpers/role";
import { IoMdCloseCircle } from "react-icons/io";
import routeApi from "../api/apiRoutes";
import { toast } from "react-toastify";
const UserRole = ({
    username,
    role,
    email,
    onclose,
    userId,
    fetchdata
}) => {
    const [userRole, setUserRole] = useState(role)
    const handleChangeRole = (e) =>{
        setUserRole(e.target.value)
    }
    const updateUserRole = async() =>{
        
        const dataFetch = await fetch(routeApi.updateRole.url,{
            method: routeApi.updateRole.method,
            credentials: 'include',
            body: JSON.stringify({
                userId: userId,
                role: userRole
            }),
            headers: {'Content-Type' : 'application/json'},
        })
        const dataRes = await dataFetch.json()
        if (dataRes.success){
            toast.success(dataRes.message)
            fetchdata()
            onclose()
            
        }
        if (!dataRes.success){
            toast.error(dataRes.message)
            onclose()
        }
        
    }

    return ( 
        <div className="fixed inset-0 w-full h-full  flex justify-between z-10 items-center bg-slate-200 bg-opacity-55">
            <div className="relative w-full max-w-sm bg-white mx-auto shadow-md px-4 pb-4 rounded py-2">

                <button className="text-xl ml-auto block" onClick={onclose }>
                       <IoMdCloseCircle /> 
                </button>

                <h1 className="font-medium pb-4 text-lg">Change User Role</h1>
                <p></p>
                <p>UserName : { username } </p>
                <p>Email: { email }</p>
                <div className="flex justify-between pt-2 pb-6">
                    <p>Role :</p>
                    <select className="px-4" value={userRole} onChange={handleChangeRole}>
                        {
                            ROLE.map((e) =>{
                                return(
                                    <option key={e}>{e}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button className="w-fit bg-red-600 block mx-auto rounded-full text-white hover:bg-red-700 py-1 px-4" onClick={updateUserRole}>Change role</button>
            </div>

        </div>
     );
}
 
export default UserRole;