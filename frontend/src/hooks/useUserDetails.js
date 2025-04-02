import { UserContext } from "../context/userContext";
import { useContext } from "react";

const useUserContext = () =>{
    const context = useContext(UserContext)

    if(!context){
        throw Error("Can't use useWorkoutContext in this route")
    }

    return context
}

export default useUserContext