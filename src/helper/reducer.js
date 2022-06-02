import { base_url } from "./Constants";

// Reducer function
export default async function Reducer (state,action){
    switch(action.type){
        case 'GET_FEEDBACK':
            const response = await fetch(base_url).then((res)=>res.json());
            state.data = await response;
            return state;
        case 'ADD_FEEDBACK':
            // state.data=[action.payload,...state.data]
            fetch(base_url,
                {method: 'POST',body: JSON.stringify(action.payload),headers: {"Content-type": "application/json; charset=UTF-8"}}).then((res)=>res.json()).then((data)=>state.data=[data,...state.data])
            return state;
        case 'EDIT_FEEDBACK':
            // state.data[action.payload.index] = action.payload.data
            fetch(base_url+action.payload.index,
                {method: 'PUT',body: JSON.stringify(action.payload.data),headers: {"Content-type": "application/json; charset=UTF-8"}}).then((res)=>res.json()).then((data)=>console.log(data,'111'))
            return state;
        case 'DELETE_FEEDBACK':
            // state.data.splice(action.payload,1)
            fetch(base_url+action.payload,{method: 'DELETE',headers: {"Content-type": "application/json; charset=UTF-8"}})
            return state;
        default:
            alert('Error occured...')
            break;
    }
}