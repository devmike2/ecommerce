import { GrSearch } from 'react-icons/gr'
import { FaRegUserCircle } from "react-icons/fa"
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Header = () => {
    return ( 
        <div className="header sticky top-0 bg-white z-10">
            <header className="h-18 shadow-md ">
                <div className="container mx-auto flex items-center h-full pl-4 justify-between py-3">
                    <div className="logo">
                        <Link to={''}>
                            EcomerceSite
                        </Link>
                    </div>

                    <div className='hidden lg:flex lg:border-2  justify-between rounded-full pl-6'>
                        <input type="text" placeholder="enter a product here .........." className="text-xl outline-none pr-10" />
                        <div className='bg-red-600 w-9 rounded-r-full text-white flex justify-center py-2 cursor-pointer hover:bg-red-700'>
                            <GrSearch />
                        </div>
                    </div>
                    <div className='gap-4 flex lg:gap-7  '>
                        <div className='text-3xl cursor-pointer'>
                            <FaRegUserCircle />
                        </div>
                        <div className='text-2xl mt-1 relative cursor-pointer '>
                           <span className=''><FaShoppingCart /></span>

                           <div className='bg-red-600 w-4 rounded-full h-4 flex justify-center text-xs items-center p-2  absolute -top-2 -right-2 text-white'>
                                <p>0</p>
                           </div> 
                        </div>


                        <div className='cursor-pointer'>
                            <Link to={'login'}>
                                <button className='bg-red-600 px-5 py-1 hover:bg-red-700 h-full  text-white rounded-2xl'>Login</button>
                            </Link>
                        </div>
                        
                    </div>

                </div>

            </header>
        </div>
     );
}
 
export default Header;