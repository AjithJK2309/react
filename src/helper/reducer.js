import { base_url } from "./Constants";

// Reducer function
export default function Reducer(state,action){
    switch (action.type){

        case 'GET_FEEDBACK':
            state={ data:action.payload};
            return state;

        case 'ADD_FEEDBACK':
            fetch(base_url,
                {method: 'POST',body: JSON.stringify(action.payload),headers: {"Content-type": "application/json; charset=UTF-8"}})
                .then((res)=>res.json()).then((data)=>state.data.push(data))
            return state;

        case 'EDIT_FEEDBACK':
            fetch(base_url+action.payload.index,
                {method: 'PUT',body: JSON.stringify(action.payload.data),headers: {"Content-type": "application/json; charset=UTF-8"}})
                .then((res)=>res.json()).then((data)=>{
                    state.data.forEach((element)=>{
                            if(element.id === data.id){
                                element.count = data.count;
                                element.message = data.message;
                            }
                    })
                })
            return state;

        case 'DELETE_FEEDBACK':
            fetch(base_url+action.payload,
                {method: 'DELETE',headers: {"Content-type": "application/json; charset=UTF-8"}})
            state.data.splice(action.payload,1);            
            return state;
            
        default:
            alert('Error occured...')
            break;
    }
}