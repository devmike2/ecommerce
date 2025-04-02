import { Link} from "react-router-dom";
import Logout from './logout';
import { useState } from "react";

const Dropdown = ({show, setShow, user}) => {
  const [showLogout, setShowLogout] = useState(false)

 
  return (
          
    <div className={`container max-w-sm shadow-md py-1  -mb-10 h-50 bg-white text-center ${show ?'' : 'hidden'}`}>
      {user?.role === 'Admin' && (
      <Link to={'/adminpage/all-products'}>
        <p className="py-2 hover:shadow-md text-lg px-5 md:block hidden" onClick={() => setShow(false)}>AdminPage</p>
      </Link>
      )}
      <Link to={'/updateprofile'}>
        <p className="py-2 hover:shadow-md text-lg px-5" onClick={() => setShow(false)}>Profile</p>
      </Link>
      <Link to={'/payment'}>
        <p className="py-2  hover:shadow-md text-lg px-5" onClick={()=> setShow(false)}>Payment</p>
      </Link>
        <span className="cursor-pointer">
          <p className="py-2 text-red-600 hover:shadow-md text-lg px-5" onClick={() => {setShowLogout(true)}}>Logout</p>
        </span>
      {showLogout && 
      (<Logout onClick ={() => setShowLogout(false)} />)}
  
    </div>


        
  );
}
 
export default Dropdown;