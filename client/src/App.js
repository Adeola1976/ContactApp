import React, { Component,useState} from 'react'
import Errorboundary from './Errorboundary'
import Navbar from './components/layout/Navbar'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Home from './components/pages/Home'
import About from './components/pages/About'
import ContactState from './context/contact/contactState'
import AuthState from './context/auth/authState'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import AlertState from './components/alert/alertState'
import Alert from './components/layout/Alert'
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './components/routing/PrivateRoute'

const  App = ()  => {

 if (localStorage.token) {
   setAuthToken(localStorage.token);
 }

 
    return (
  
<AuthState>
 <ContactState>
   <AlertState>
    <Router>
        <>
           
            <Errorboundary>
               <Navbar/>
               <div className="container">
                  <Alert />
                   <Switch>
                        <PrivateRoute exact path='/' component={Home}/>
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/about' component={About}/>
                   </Switch>
               </div>
               
              
                
            </Errorboundary>
        
         </>
     </Router>  
   </AlertState>

   </ContactState>   
 </AuthState>   
    
    )
  }


export default App
