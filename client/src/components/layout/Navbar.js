import React,{useContext,useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import '../../App.css'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'
import setAuthToken from '../../utils/setAuthToken'

const  Navbar  = ({title,icon}) =>  {


    
 if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
    const authContext = useContext(AuthContext);
    const {isAutheticated,user,logout, loadUser} = authContext;
    const contactContext = useContext(ContactContext);
    const {clearContacts} = contactContext;
  


     useEffect ( () => {
        if (isAutheticated)  {
            loadUser();
         }
         // eslint-disable-next-line
     },[isAutheticated])
 
    const isLogout = () => {
        logout();
        clearContacts();
    }
    
    const authLinks =
     <>
            {user &&
            <div>
             <li>{user.name}</li>
             <li><a onClick={isLogout}><i className="fas fa-sign-out-alt"></i><span className="hide-sm">Logout</span></a></li>
             </div>
             }
     </>

    const guestLinks =
    <>
        <div className="navbar">
                    <li>
                        <Link to="/register">Register</Link> 
                
                        <Link to="/login">Login</Link> 
                    </li> 
            
      </div>
            
    </>
    return (
        <div className = "bg-primary">
            <h5>
                <i className={icon} /> {title}
            </h5>
           <ul>
               {isAutheticated?authLinks:guestLinks}   
          </ul>
             
        </div>
    )
}

Navbar.propTypes  = {
    title:PropTypes.string.isRequired,
    icon:PropTypes.string,
}

Navbar.defaultProps = {
    title:"Contact Keeper",
    icon:'fas fa-id-card-alt',
}

export default Navbar
