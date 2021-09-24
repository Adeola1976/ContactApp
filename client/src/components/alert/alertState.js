import React,{useReducer} from 'react'
import AlertContext from './alertContext'
import alertReducer from './alertReducer'

 


    const AlertState = props => {
    const initialState = [];
    const setAlert = (msg,type,timeout=5000) => {
        const id = Math.random(1,5000);
        dispatch({type:'SET_ALERT',payload:{id,msg,type}});
        setTimeout(()=>dispatch({type:'REMOVE_ALERT',payload:id}),timeout);
    }
       





    //pass the state to the reducer
    const [state,dispatch]   = useReducer(alertReducer,initialState);



    //loan user


    //Register User


    //Login User


    //Logout


    //clear User
  
    

    return  (
     <AlertContext.Provider value={{setAlert,alert:state}}>
          {props.children}      
    </AlertContext.Provider>

     )
}


export default AlertState