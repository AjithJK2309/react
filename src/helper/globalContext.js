import React,{createContext,useReducer} from "react";
import Reducer from "./reducer";

// global state
const initialState = {
    data:[]
}

// context creation
export const globalContext = createContext(initialState)

// data provider
export  const GlobalManage=({children})=>{
    // reducer creation
    const [state,dispatch] = useReducer(Reducer,initialState);

    // actions for call the reducer function using dispatch
    function addFeedback(val){
        dispatch({
            type:'ADD_FEEDBACK',
            payload:val
        })
    }

    function editFeedback(val,index){
        dispatch({
            type:'EDIT_FEEDBACK',
            payload:{data:val,index:index}
        })
    }

    function deleteFeedback(index){
        dispatch({
            type:'DELETE_FEEDBACK',
            payload:index
        })
    }

    // providing data globally
    return(
        <globalContext.Provider value={{state,addFeedback,editFeedback,deleteFeedback}}>
                {children}
        </globalContext.Provider>
    )
}