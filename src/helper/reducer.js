// Reducer function
export default function Reducer(state,action){
    switch(action.type){
        case 'ADD_FEEDBACK':
            state.data=[action.payload,...state.data]
            return state;
        case 'EDIT_FEEDBACK':
            state.data[action.payload.index] = action.payload.data
            return state;
        case 'DELETE_FEEDBACK':
            state.data.splice(action.payload,1)
            return state;
        default:
            alert('Error occured...')
            break;
    }
}