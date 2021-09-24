 
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERROR,

} from '../types'


export default  (state,action)  => {
    switch(action.type) {

        
        case USER_LOADED:  
            return {
                 ...state,
                 isAutheticated:true,
                 loading:false,
                 user:action.payload,
                 error:null            
            }   
    
     
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        localStorage.setItem('token',action.payload.token)    
        return {
             ...state,
             ...action.payload,
             isAutheticated:true,
             loading:false,
         
              
        }

        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:   
            localStorage.removeItem('token') 
           return {
            ...state,
            token:null,
            isAutheticated:false,
            loading:false, 
            user:null,
            error:action.payload     
       }

     case CLEAR_ERROR:
         return {
             ...state,
             error:null
         }
         case LOGOUT:
            return {
             ...state,
             isAutheticated:false,
            }
        default: return state;
    }

   
} 