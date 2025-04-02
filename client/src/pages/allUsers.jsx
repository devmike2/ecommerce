import { useEffect, useState } from "react";
import routeApi from "../api/apiRoutes";
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import UserRole from "../components/changeUserRole";


const GetAlluser = () => {
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [allUser, setAllUser] = useState([])
    const [selectUser, setSelectedUser] = useState({
        email: '',
        username: '',
        role: '',
        _id:  ''
    })

    const handleClick = (user) =>{
        setOpenUpdateRole(true)
        setSelectedUser(user)
    }
    const fetchAllUser = async () =>{
        const res = await fetch(routeApi.alluser.url,{
            method: routeApi.alluser.method,
            credentials: 'include'
        })
        const resData = await res.json()
        resData.success? setAllUser(resData.data): console.log('data : ', resData)
    }
    useEffect(() =>{
        fetchAllUser()
    },[])
   
    return ( 
        <div >
            <table className="w-full h-full bg-white tabledata pb-10">
                <thead>
                    <tr className="bg-black text-white">
                        <th>Sn</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allUser?.map((el,index) =>{
                        return(
                            <tr key={index} className={` ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                <td>{ index+1 }</td>
                                <td>{ el.name }</td>
                                <td>{ el.username }</td>
                                <td>{ el.email }</td>
                                <td>{ el.role }</td>
                                <td>{ moment(el.createdAt).format('ll') }</td>
                                <td className="flex justify-center">
                                    <span className="bg-green-100 p-1 rounded-full text-lg hover:bg-green-600 hover:text-white cursor-pointer"> 
                                        <MdModeEdit  onClick={() => handleClick(el)}/>
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {
               openUpdateRole && (
                <UserRole 
                onclose= {() => setOpenUpdateRole(false)} 
                username={selectUser.username}
                email={selectUser.email}
                role={selectUser.role}
                userId={selectUser._id}
                fetchdata={fetchAllUser}
                />
               ) 
            }
            
        </div>
     );
}
 
export default GetAlluser;