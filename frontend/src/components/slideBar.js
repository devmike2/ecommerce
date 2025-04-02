import { useEffect, useState } from "react";
import image1 from '../Assest/img1.jpg'
import image2 from '../Assest/image2.webp'
import image3 from '../Assest/image3.webp'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";


const SlideBar = () => {
    const [changeImage, setChangeImage] = useState(0)

    const images = [
        image1,
        image2,
        image3
    ]
  
    const nextImage =() =>{
        if(images.length - 1 > changeImage){
            setChangeImage((prev) => prev + 1)
        }else{
            setChangeImage(0)
        }
    }
    const prevImage =() =>{
        if( changeImage !== 0){
            setChangeImage((prev) => prev - 1)
        }
    }
    useEffect(() =>{
        const interval = setInterval(() =>{
            if(images.length - 1 > changeImage){
                nextImage()
            }else{
                setChangeImage(0)
            }
        },5000)

        return () => clearInterval(interval)
    }, [changeImage])
    return ( 
        <div className="container mx-auto p-0 md:p-4">
            <div className=" h-48 md:h-72 w-full relative ">
                    <div className="h-full flex overflow-hidden">
                        <div className="hidden absolute h-full  w-full md:flex items-center z-10">
                            <div className="flex justify-between w-full  text-2xl">
                                <button onClick={prevImage} className="bg-white shadow-md rounded-full p-1"><FaAngleLeft /></button>
                                <button onClick={nextImage}  className="bg-white shadow-md rounded-full p-1"><FaAngleRight /></button>
                            </div>
                           
                        </div>
                        {
                            
                            images.map((banner, index) =>{
                                return(
                                    <div key={banner+index} className="h-full min-w-full minh-full transition-all" style={{transform: `translatex( -${changeImage * 100}%)`}}>
                                        <img src={banner} alt="slideshow"  className="h- h-full w-full object-cover md:object-fill"/>
                                    </div>
                                )
                            })
                        }
                    </div>
            </div>
        </div>
     );
}
 
export default SlideBar;