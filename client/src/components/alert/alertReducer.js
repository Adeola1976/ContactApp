
export default  (state,action)  => {
    switch(action.type) {
        case 'SET_ALERT': return [
             ...state, action.payload  
        ]

        case 'REMOVE_ALERT': return state.filter(filter=> filter.id!==action.payload.id)
    
        default: return state;
    }

   
} 