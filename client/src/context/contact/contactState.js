import React,{useReducer} from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'

 
import {
    ADD_CONTACT,
    GET_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_CONTACT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

const ContactState = props => {
    const initialState = {
         contact: [],
         current:null,
         filtered:null,
         error:null,
         msg:null
}

    //pass the state to the reducer
    const [state,dispatch]   = useReducer(contactReducer,initialState);

    const getContacts = async () => {
              
        try{
            const res = await axios.get('/api/contact');
            dispatch({type:GET_CONTACT,payload:res.data});
          }

            catch(err) {  
              dispatch({type:CONTACT_ERROR,payload:err.response.data.message}); 
            }
    }

    //add a contact
    const addcontact = async contact => {
        const config = {
            headers : {
                'Content-Type': 'application/json'
           }
       }
           
           try{
                        const res = await axios.post('/api/contact',contact,config);
                        dispatch({type:ADD_CONTACT,payload:res.data});
           }
           
           catch(err) {  
            dispatch({type:CONTACT_ERROR,payload:err.response.data.message}); 
           }
    }


    //delete a contact function
    const  deleteContact = async id => {

     
           
           try{
                        const res = await axios.delete(`/api/contact/${id}`);
                        dispatch({type:DELETE_CONTACT,payload:id
                         
                        });
                        }
                            
                    catch(err) {  
                        dispatch({type:CONTACT_ERROR,payload:err.msg}); 
                    }
     }

   
     // update the current user 
 
     const updateContact= async contact => {
        const config = {
            headers : {
                'Content-Type': 'application/json'
           }
       }
           
           try{
                        const res = await axios.put(`/api/contact/${contact._id}`, contact,config);
                        dispatch({type:UPDATE_CONTACT,payload:res.data});
           }
           
           catch(err) {  
            dispatch({type:CONTACT_ERROR,payload:err.msg}); 
           }
       
    }





     // edit conact function

     const editContact = contact => {
         dispatch({type:SET_CURRENT, payload:contact});
     }
     
     //clear the current when the delete button is clicked
     const clearContact = () => {
         dispatch({type:CLEAR_CURRENT});
     }

    
    
    //filter a user 

    const filterContact = text => {
        dispatch({type:FILTER_CONTACTS, payload:text});
    }
     
    const clearFilter = () => {
        dispatch({type:CLEAR_FILTER});
    }

    const clearContacts = () => {
        dispatch({type:CLEAR_CONTACT});
    }
    

    return  (
     <ContactContext.Provider value={{contact:state.contact, addcontact,  deleteContact, current:state.current,editContact,clearFilter,
     clearContact,updateContact,filterContact,filtered:state.filtered,error:state.error,getContacts,clearContacts,msg:state.msg}}>
          {props.children}      
    </ContactContext.Provider>

     )
}


export default ContactState