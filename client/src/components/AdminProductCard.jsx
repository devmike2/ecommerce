import { MdEdit } from "react-icons/md";
import UpdateProduct from "./updateProducts";
import { useState } from "react";
import currencySymbol from "../helpers/currencySymbol";
import { IoMdTrash } from "react-icons/io";
import ConfirmDeleteProduct from "./confirmDeleteProduct";
const ProductCard = (
    {data, onFetch}
) => {
    const [openUpdateField, setOpenUpdateField] = useState(false)
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
    return ( 
        <div className="bg-white">
            <div className="px-3 py-1 text-center w-full max-w-36 ">
                <div className="max-w-48 w-full mx-auto">
                    <img src={data?.productImg[0]} alt={data?.productImg} width={130} height={130}/>
                </div>
                <h2 className="text-ellipsis line-clamp-1">{data.productName}</h2>
                <p>{currencySymbol(data.sellingPrice)}</p>
                <div className="flex justify-between w-full py-3">
                    <div className="text-xl  cursor-pointer bg-green-100 p-1 rounded-full hover:text-white hover:bg-green-600" onClick={() => setOpenUpdateField(true)}>
                        <MdEdit />
                    </div>
                    <div className="text-xl cursor-pointer bg-red-100 p-1 rounded-full hover:text-white hover:bg-red-600" onClick={() => setOpenConfirmDelete(true)}>
                        <IoMdTrash />
                    </div>
                </div>
            </div>
            <div>
                {openUpdateField &&(<UpdateProduct onClose={() => setOpenUpdateField(false)} onUpdate={onFetch} updatedata={data}/>)}
            </div>
            <div>
                {openConfirmDelete && (<ConfirmDeleteProduct data={data} onUpdate={onFetch}  onClose={() => setOpenConfirmDelete(false)}/>)  }
            </div>
        </div>  
     );
}
 
export default ProductCard;