import {
    ADD_CONTACT,
    GET_CONTACT,
    CONTACT_ERROR,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_CONTACT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    SET_ALERT,
    REMOVE_ALERT
} from '../types'


export default  (state,action)  => {
    switch(action.type) {
        case ADD_CONTACT: return {
             ...state,
             contact: [action.payload,...state.contact],
             loading:false,
              
        }
        
        case GET_CONTACT: return {
          ...state,
          contact: action.payload,
          loading:false,
        }


        case UPDATE_CONTACT: return {
            ...state,
            contact: state.contact.map(contact => contact._id===action.payload._id?action.payload:contact),
            loading:false, 
             
       }

        case DELETE_CONTACT: return {
            ...state,
            contact: state.contact.filter(cont => cont._id!==action.payload),
            loading:false,
       }
      
       case FILTER_CONTACTS: return {
        ...state,
        contact: state.contact.filter(contact => {
             const regExp = new RegExp(`${action.payload}`,'gi');
             return contact.name.match(regExp)|| contact.email.match(regExp)
        }
    )
         
   }
        
       case SET_CURRENT: return {
        ...state,
        current: action.payload,
         
        }
   
        case CLEAR_CURRENT: return {
            ...state,
            contact:null,
            loading:true,
            filtered:null,
            current:null,
            error:null
            }

            case CLEAR_CONTACT: return {
                ...state,
                current:null 
                }
       
        case CLEAR_FILTER: return {
            ...state,
            filtered:null 
            }
            case CONTACT_ERROR:return {
                ...state,
                error:action.payload,
            }
    
        default: return state;
    }

   
} 