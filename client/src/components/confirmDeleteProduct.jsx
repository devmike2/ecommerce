import routeApi from '../api/apiRoutes'
import {toast} from 'react-toastify'

const ConfirmDeleteProduct = ({onClose, data, onUpdate}) => {
    const handleDelete = async() =>{
        const fetchRes = await fetch(routeApi.DeleteProdut.url,{
            method: routeApi.DeleteProdut.method, 
            body: JSON.stringify({
                reqId: data?._id
            }),
            headers: {'Content-type' : 'application/json'},
            credentials: 'include'
        })
        const dataRes = await fetchRes.json()

        if (dataRes.success){
            toast.success(dataRes.message)
            onClose()
            onUpdate()
        }
        if(!dataRes.success){
            toast.error(dataRes.message)
        }
    }

    return ( 
        <div className="bg-slate-50 fixed flex justify-center  inset-0 z-10 items-center bg-opacity-40">
            <div className="bg-white max-w-sm w-full mx-auto h-full max-h-[30vh] rounded flex justify-center text-center flex-col ">
                <p className="font-bold">Do you want to delete this Product?</p>
                <div className="flex justify-between px-4 pt-3">
                    <div className="bg-green-600 hover:bg-green-700 px-12 py-2 cursor-pointer rounded-full text-white hover:underline" onClick={handleDelete}>
                        Yes
                    </div>
                    <div className="bg-red-600 hover:bg-red-700 px-12 py-2 cursor-pointer rounded-full text-white hover:underline" onClick={onClose}>
                        No
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ConfirmDeleteProduct;