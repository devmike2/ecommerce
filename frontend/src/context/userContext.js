import { createContext, useReducer } from "react";

export const UserContext = createContext()
export const userReducer = (state, action) =>{
    switch (action.type){
        case 'set_user_details':
            return{
                userdetails: action.payload
            }
        default: {
            return state
            
        }
    }
}

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, {
        userdetails: null
    })
    return (
        <UserContext.Provider value = {{...state, dispatch}}>
            { children}
        </UserContext.Provider>
    )
}