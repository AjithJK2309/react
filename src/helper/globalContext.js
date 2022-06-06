import React,{createContext,useReducer} from "react";
import Reducer from "./reducer";



// context creation
export const globalContext = createContext()

// data provider
export  const GlobalManage=({children})=>{

    // global state
    const initialState = {
        data:[]
    }

    // reducer creation
    const [state,dispatch] = useReducer(Reducer,initialState);

    // getAll Feedback
    function allFeedback(val){
        dispatch({
            type:'GET_FEEDBACK',
            payload:val
        })
    }

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

    function deleteFeedback(id){
        dispatch({
            type:'DELETE_FEEDBACK',
            payload:id
        })
    }


    // providing data globally
    return(
        <globalContext.Provider value={{state,allFeedback,addFeedback,editFeedback,deleteFeedback}}>
                {children}
        </globalContext.Provider>
    )
}