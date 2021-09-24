import React, {useContext,useEffect} from 'react'
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import contactContext from '../../context/contact/contactContext'
import Spinner  from '../layout/Spinner'
import Contactitem from './ContactItem'
import '../../App.css'


const Contact = () => {
     const contacts = useContext(contactContext);
     const {contact,filtered,getContacts,loading} = contacts;

      useEffect ( () => {
        getContacts();
       // eslint-disable-next-line
      },[])
     if(contact!=null && contact.length===0 && !loading) {
         return <h4>Please enter a  contact</h4>
     }
  
     return (
         <>
         {contact!==null && !loading ? 
         <TransitionGroup>
            {filtered===null?contact.map(value => (
            <CSSTransition  key={value._id} timeout={500} className="item" >
                <Contactitem  contact={value} /> 
                </CSSTransition>))
                :filtered
            .map(value =>  (
            <CSSTransition  key={value._id} timeout={500} className="item"> 
            <Contactitem contact={value}/> 
            </CSSTransition> ))} 

          </TransitionGroup>  
 : <Spinner/>}
         </> 
     )
}



export default Contact

