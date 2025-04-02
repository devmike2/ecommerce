import { GrSearch } from 'react-icons/gr'
import { FaRegUserCircle } from "react-icons/fa"
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Dropdown from './dropdown';
import { useState } from 'react';
import { useAppStore } from '../store/slice';


const Header = () => {
    const [show, setShow] = useState(false)
    const { userInfo } = useAppStore()
    const { cartCount } = useAppStore()
    return ( 
        
        <div className="header sticky top-0 bg-white z-20 md:px-4  shadow-md">
            <header className="h-18 ">
                <div className="container mx-auto flex items-center h-full  justify-between py-3">
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
                       
                        
                        {
                            userInfo?._id &&(
                                <Link to={'add-to-cart'}>
                                    <div className='text-2xl mt-3 relative cursor-pointer pt'>
                                    <span className=''><FaShoppingCart /></span>

                                    <div className='bg-red-600 w-4 rounded-full h-4 flex justify-center text-xs items-center p-2  absolute -top-2 -right-2 text-white'>
                                            <p>{cartCount?.count}</p>
                                    </div> 
                                    </div>
                                </Link>
                            )
                        }
                        <div className='gap-4 flex lg:gap-7 item-center pt-2 '>
                            <span className='hidden md:block'>{userInfo? userInfo.username: ''}</span>
                        </div>

                            
                            <div className='relative justify-center flex'>
                                {userInfo&&(
                                    userInfo.profilePic?
                                <div className='text-sxl cursor-pointer'>
                                     <img src={userInfo.profilePic} alt="profilepic" className="w-10 h-10 rounded-full object-cover" onClick={() => setShow((prev) => !prev) }/> 
                                </div>
                                :
                                <div className='cursor-pointer'>
                                    <span className='text-3xl' onClick={() => setShow((prev) => !prev) }>
                                        <FaRegUserCircle />
                                    </span>
                                </div>)}
                                
                               
                              
                                { userInfo?
                                    show &&
                                    <div className='absolute right-0  md:-right-4  top-10 sm:w-fit lg:block -'>
                                        <Dropdown show={show}  setShow={setShow} user={ userInfo }/>
                                    </div>
                                    :
                                    ""
                                    
                                }
                               
                                
                            </div>
                            
                              
                            {!userInfo?
                                < div className='cursor-pointer'>
                                    <Link to={'login'}>
                                        <button className='bg-red-600 px-5 py-1 hover:bg-red-700 h-full  text-white rounded-2xl'>Signin</button>
                                    </Link>
                                </div>
                                :
                                ""
                            }

                    </div>
                           
                </div>

            </header>
        </div>
     );
}
 
export default Header;
