import { GrClose } from "react-icons/gr";

const FullProductImage = ({
    imageUrl,
    onClose
}) => {
    return ( 
        <div className="fixed inset-0  top-10"> 
            <div className="bg-white rounded shadow-lg flex-col min-h-0 max-w-3xl mx-auto flex justify-center p-4 items-center">
                <button className="text-xl ml-auto block hover:text-red-600" onClick={onClose }>
                    <GrClose /> 
                </button>
                <div className="flex justify-center ">
                   
                    <img src={imageUrl} alt={imageUrl} className="w-full h-full"/>
                </div>
            </div>
           
        </div>
     );
}
 
export default FullProductImage;