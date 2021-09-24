import React,{useState,useContext,useEffect} from 'react'
import AlertContext from '../alert/alertContext'
import AuthContext from '../../context/auth/authContext'


const Register = props => {
    const alertContent = useContext(AlertContext);
    const authContent = useContext(AuthContext);
    const {setAlert} = alertContent;
    const {Register,error,clearError,isAutheticated, loadUser} = authContent;

    const [user,setUser] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const{name,email,password,password2} = user;

    const onChange = e => {
        setUser({...user, [e.target.name]:e.target.value});
    }
    const onSubmit = e => {
        e.preventDefault();
        if(name===''||email===''||password===''||password2==='') {
        setAlert('please enter all fields','danger');
    }
        else if (password!==password2) {
        setAlert('Password must be the same','danger');
    }
        else   { 
        Register({name,email,password})
      
       
    }
     
       
        
}

useEffect( () => {
     if (isAutheticated)  {
        props.history.push('./')
     }

     if(error==='User already exist') 
    setAlert(error,'danger');
    clearError();
    // eslint-disable-next-line
},[error,isAutheticated,props.history])
    return (
        <div className='grid-2'>
              <h2> Account   <span className="text-primary">Register</span></h2>
              <form onSubmit={onSubmit}>
              <div className="col-md-6 col-xs-6 col-lg-6">
                  <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" name="name" placeholder="Name" value={name} onChange={onChange} />
                   </div>
                   <div className="form-group">
                       <label htmlFor="email">Email</label>
                       <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Password" value={password} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Password confirm</label>
                        <input type="password" name="password2"  placeholder="Password confirm" value={password2} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="submit" className= "btn btn-primary btn-block" value='Register User'/>
                    </div>
               </div>
               </form>

            
        </div>
    )
   }

export default Register
