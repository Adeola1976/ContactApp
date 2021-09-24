import React,{useContext,useEffect} from 'react'
import Contact from '../contact/Contact'
import Contactform from '../contact/Contactform'
import Contactfilter from '../contact/Contactfilter'
import AuthContext from '../../context/auth/authContext'

 const  Home = () => {
     const authContext = useContext(AuthContext);
   

      useEffect ( () => {
        authContext.loadUser();
      
           // eslint-disable-next-line
      },[])

     
    return (
        <div className="grid-2">
            <div>
                  <Contactform/>
            </div>
            
            <div>
                <Contactfilter/>
                <Contact/>
            </div>
        </div>
    )
}

export default Home